import React, { Component } from 'react';
import AccomendationDetailsReviewSingle from '../components/AccomendationDetailsReviewSingle'
import NonEditableRatingReact from '../components/NonEditableRatingReact';

class AccomendationDetailsReviewForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            reviewList : this.props.reviewList,
            numberOfReviewer: this.props.reviewList.length,
            propertyAverage : null,

        }
        this.renderNumberOfReviewer = this.renderNumberOfReviewer.bind(this)
        this.renderMultipleReviewDetails = this.renderMultipleReviewDetails.bind(this)
    }
    
    componentWillMount(){
        let average = 0
        this.props.reviewList.map(item => {
            average += item.star
        })
        this.setState({
            propertyAverage: average/this.state.reviewList.length
        })
        this.state.reviewList.filter(transaction => transaction.accommodationId.status === 'close')
    }


    renderNumberOfReviewer(){
        if(this.props.reviewList !== null){
            if(this.state.numberOfReviewer === 0){
                return("No one commented this accommodation, be the first one to left your comment!")
            }else if(this.state.numberOfReviewer === 1){
                return("One review from people who commented this accommodation")
            }else{
                return(`${this.state.numberOfReviewer} reviews from people who commented this accommodation`)
            }
        }
    }


    renderMultipleReviewDetails(){
        console.log(this.state.reviewList)
        if(this.state.reviewList.length !== 0){
            return this.state.reviewList.map((review, index) => (
                <AccomendationDetailsReviewSingle key={index} name={`${review.traveler.firstName} ${review.traveler.lastName}`}
                transactionDate={review.accommodationId.startDate.slice(0,-14) +" to " +review.accommodationId.endDate.slice(0,-14)} reviewDate={review.reviewDate.slice(0,-14)} star={review.star}
                reviewComments={review.review}
                />
            ))
        }
    }
    


    render(){
        console.log(this.state)
        return (
            <div className="total_comment">
                <div className="total_star">
                    <h2 className="total_star_word">{this.renderNumberOfReviewer()}</h2>
                    {this.state.reviewList.length === 0 ? null : <span>{this.state.propertyAverage.toFixed(1)}/5.0</span>}

                    {this.state.reviewList.length === 0 ? null : <NonEditableRatingReact rating={Math.round(this.state.propertyAverage)}/>}
                </div>

                <div className="all_comment">
                    {this.renderMultipleReviewDetails()}
                </div>
            </div>
        )
    }

}

export default AccomendationDetailsReviewForm