import React, { Component } from 'react';
import UserProfileTravellerSingle from '../components/UserProfileTravellerSingle';
import EditableRatingReact from '../components/EditableRatingReact';
import NonEditableRatingReact from '../components/NonEditableRatingReact';
import { CLIENT_RENEG_LIMIT } from 'tls';

class UserProfileTravellerForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            travellerHistory : null,
            //below part is for dynamically handle write review/check review window poping up
            reviewFormStatus: false,
            reviewFormIndex : null,
            reviewFormReviewContent: null,
            reviewFormReviewStar: null,
            //below are for submit the review form to commit a new review to database
            reviewFormInput: "",
            reviewFormMark: null,
        }
        this.renderReviewForm = this.renderReviewForm.bind(this);
        this.renderTravellerHistory = this.renderTravellerHistory.bind(this);
        this.handleReviewFormSubmit = this.handleReviewFormSubmit.bind(this);
        this.handleClickReviewButton = this.handleClickReviewButton.bind(this);
        this.handleReviewFormContentChange = this.handleReviewFormContentChange.bind(this);
        this.handleReviewFormStarChange = this.handleReviewFormStarChange.bind(this);
    }

    componentWillMount(){
        fetch(`api/history/traveler/${localStorage.getItem('uid')}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
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
                 status={singleRecord.status}
                 handleClickReviewButton={this.handleClickReviewButton.bind(this)} reviewFormStatus={this.state.reviewFormStatus}
                 reviewFormIndex={index}
            />))
        }
    }

    componentDidUpdate(prevProps,prevState){
        
    }

    handleClickReviewButton(reviewStateFromSingle,reviewFormIndex){
        if(this.state.reviewFormIndex !== null && this.state.reviewFormIndex !== reviewFormIndex){
            this.setState({
                reviewFormStatus : true,
                reviewFormIndex : reviewFormIndex,
                reviewFormReviewContent : this.state.travellerHistory[reviewFormIndex].review,
                reviewFormReviewStar : this.state.travellerHistory[reviewFormIndex].star,
            })
        }else{
            this.setState({
                reviewFormStatus : !this.state.reviewFormStatus,
                reviewFormIndex : reviewFormIndex,
                reviewFormReviewContent : this.state.travellerHistory[reviewFormIndex].review,
                reviewFormReviewStar : this.state.travellerHistory[reviewFormIndex].star,
            })
        }
    }

    handleReviewFormContentChange(e){
        this.setState({
            reviewFormInput: e.target.value
        });
    }

    handleReviewFormStarChange(starFromEditableStarComponent){
        this.setState({
            reviewFormMark : starFromEditableStarComponent
        })
    }


    handleReviewFormSubmit(e){
        e.preventDefault();
        //submit review to server

        if(this.state.reviewFormInput !== null && this.state.reviewFormMark !== null){
            let url = '/api/review/update';
            let data = {
                traveler: localStorage.getItem('uid'),
                accommodationId: this.state.travellerHistory[this.state.reviewFormIndex]['accommodationId']['_id'],
                review : this.state.reviewFormInput,
                star : this.state.reviewFormMark,
                property: this.state.travellerHistory[this.state.reviewFormIndex]['accommodationId']['property']['_id'],
            };
            console.log(JSON.stringify(data))
            fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => alert('Review Success!', JSON.stringify(response)))
            .then(window.location.href="./profile")
            .catch(error => console.error('Error:', error));
        }
    }

    renderReviewForm(){
        if(this.state.travellerHistory !== null){
            if(this.state.reviewFormStatus === true){
                if(this.state.reviewFormReviewContent !== null){
                    return (
                        <div id="comment_area" >
                        <div className="word_comment">
                            <h3>Your Review for this wonderful accomondation was: </h3>
                        </div>
                            <textarea disabled placeholder={this.state.reviewFormReviewContent} name="comment_textarea" className="comment_textarea" cols="100" rows="5"></textarea>
                        <div className="review">
                        <h4>Rating: {this.state.reviewFormReviewStar}.0 / 5.0</h4>
                            <span className="star">
                                {this.state.reviewFormReviewStar === null ?  
                                <EditableRatingReact /> :
                                <NonEditableRatingReact rating={this.state.reviewFormReviewStar}/>}
                            </span>
                            <span className="star-txt"></span>
                        </div>
                    </div>
                    )
                }else{
                    return(
                        <div id="comment_area" >
                        <div className="word_comment">
                            <h3>Review area:</h3>
                        </div>
                        <textarea value={this.state.reviewFormInput} onChange={this.handleReviewFormContentChange}
                            placeholder="Write your comment here..." name="comment_textarea" 
                            className="comment_textarea" cols="100" rows="3">
                        </textarea>
                
                        <div className="review">
                            <span className="star">
                                {this.state.reviewFormReviewStar === null ?  
                                <EditableRatingReact handleReviewFormStarChange={this.handleReviewFormStarChange.bind(this)}/> :
                                <NonEditableRatingReact rating={this.state.reviewFormReviewStar}/>}
                            </span>
                            <span className="star-txt"></span>
                        </div>
                        <div className="comment_submit">
                            <button type="submit" className="submit_button" onClick={this.handleReviewFormSubmit}>Submit</button>
                        </div>
                    </div>
                    )
                }
            }else{
                return (
                    null
                )
            }
        }
    }

    render () {
        return (
            <div>
                {this.renderReviewForm()}

                <div className="traveller_history">
                    <div className="word_history">
                        <h3>History:</h3>
                    </div>
                    <form action="/" method="post">
                        <table className="traveller_table zebra">
                            <tbody>
                            <tr className="tablehead">
                                <td width="15%">Suburb</td>
                                <td width="15%">Price</td>
                                <td width="20%">Address</td>
                                <td width="15%">StartTime</td>
                                <td width="15%">EndTime</td>
                                <td width="15%">Status</td>
                                <td width="5%">Review</td>
                            </tr>
                                {this.renderTravellerHistory()}
                            </tbody>
                        </table>
                        <div className="button_part">
                            <a href="/release/traveller" className="add_button">Release Accomondation Needed Information</a>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default UserProfileTravellerForm