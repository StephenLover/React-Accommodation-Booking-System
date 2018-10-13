import React, { Component } from 'react';
import NonEditableRatingReact from '../components/NonEditableRatingReact';

class AccomendationDetailsReviewSingle extends Component{
    constructor(props){
        super(props)
        this.state = {
            icon: "",
            name: this.props.name,
            transactionDate: this.props.transactionDate,
            reviewDate: this.props.reviewDate,
            star: this.props.star,
            reviewComments: this.props.reviewComments,
        }
    }
    



    render(){
        console.log(this.state)
        return (
            <div className="personal_comment">
                <div className="comment_person_detail">
                    <img src={require(`../img/Astrid_1.ico`)} alt="" className="comment_person_img"/>
                    <span id="comment_person_name">{this.state.name}</span>
                    {/* <span id="comment_person_time">{this.state.transactionDate}</span> */}
                    <div className="comment_person_review_date">
                        {this.state.reviewDate}
                    </div>
                    

                </div>
                <div className="detail_review_star">
                    <NonEditableRatingReact rating={this.state.star}/>
                </div>

                <div className="comment_words">
                    <span>{this.state.reviewComments}</span>
                </div>
            </div>
        )
    }

}

export default AccomendationDetailsReviewSingle