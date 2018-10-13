import React, { Component } from 'react';
import UserProfileTravellerSingle from '../components/UserProfileTravellerSingle';
import EditableRatingReact from '../components/EditableRatingReact';


class UserProfileTravellerForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            travellerHistory : null,
            reviewFormStatus: false,
            reviewFormContent: {
                review: null,
                star: null,
            }
        }
        this.renderReviewForm = this.renderReviewForm.bind(this);
        this.renderTravellerHistory = this.renderTravellerHistory.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleClickReviewButton = this.handleClickReviewButton.bind(this);
    }

    componentWillMount(){
        fetch(`api/history/traveler/${localStorage.getItem('uid')}`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                travellerHistory : res
            })
        })
        .catch((err) => {console.log(err)})
    }

    renderTravellerHistory(){
        if(this.state.travellerHistory !== null){
            return this.state.travellerHistory.map((singleRecord, index)=> (<UserProfileTravellerSingle
                 key={index} suburb={singleRecord.accommodationId.property.suburb} price={singleRecord.accommodationId.price}
                 address={singleRecord.accommodationId.property.address} startTime={singleRecord.accommodationId.startDate.slice(0,-14)}
                 endTime={singleRecord.accommodationId.endDate.slice(0,-14)} review={singleRecord.review} star={singleRecord.star}
                 handleClickReviewButton={this.handleClickReviewButton.bind(this)} reviewFormStatus={this.state.reviewFormStatus}
            />))

        }
    }

    componentDidUpdate(prevProps,prevState){
        
    }

    handleClickReviewButton(reviewStateFromSingle){
        console.log(reviewStateFromSingle)
        this.setState({
            reviewFormStatus : !this.state.reviewFormStatus,
        })
    }

    handleFormSubmit(e){
        e.preventDefault();
        //submit review to server
    }

    renderReviewForm(){
        if(this.state.travellerHistory !== null){
            if(this.state.reviewFormStatus === true){
                return (
                    <div id="comment_area" >
                        <div className="word_comment">
                            <h3>Review area:</h3>
                        </div>
                        <textarea name="comment_textarea" className="comment_textarea" cols="100" rows="3"></textarea>
                        <div className="review">
                            <span className="star">
                                Star:
                                <EditableRatingReact/>
                            </span>
                            <span className="star-txt"></span>
                        </div>
                        <div className="comment_submit">
                            <button type="submit" className="submit_button">Submit</button>
                        </div>
                    </div>
                )
            }else{
                return (
                    null
                )
            }
        }
    }

    render () {

        console.log(this.state.reviewFormStaus, this.props.renderReviewForm)
        return (
            <div>
               
                {/* <div id="comment_area" >
                <div id="comment_area" style={{display:'none'}} >
                    <div className="word_comment">
                        <h3>Review area:</h3>
                    </div>
                    <textarea name="comment_textarea" className="comment_textarea" cols="100" rows="3"></textarea>
                    <div className="review">
                        <span className="star">
                            Star:
                            <EditableRatingReact/>
                        </span>
                        <span className="star-txt"></span>
                    </div>
                    <div className="comment_submit">
                        <button type="submit" className="submit_button">Submit</button>
                    </div>
                </div> */}
                {this.renderReviewForm()}

                <div className="traveller_history">
                    <div className="word_history">
                        <h3>History:</h3>
                    </div>
                    <form action="/" method="post">
                        <table className="traveller_table zebra">
                            <tbody>
                            <tr>
                                <td width="15%">Suburb</td>
                                <td width="15%">Price</td>
                                <td width="45%">Address</td>
                                <td width="10%">StartTime</td>
                                <td width="10%">EndTime</td>
                                <td width="5">Review</td>
                            </tr>
                                {this.renderTravellerHistory()}
                            </tbody>
                        </table>
                        <div className="button_part">
                            <a href="ReleaseInformation.html" className="add_button">Release Accomondation Needed Information</a>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default UserProfileTravellerForm