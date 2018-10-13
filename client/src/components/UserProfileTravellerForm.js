import React, { Component } from 'react';
import UserProfileTravellerSingle from '../components/UserProfileTravellerSingle';
import EditableRatingReact from '../components/EditableRatingReact';
import NonEditableRatingReact from '../components/NonEditableRatingReact';

class UserProfileTravellerForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            travellerHistory : null,
            reviewFormStatus: false,
            reviewFormIndex : null,
            reviewFormReviewContent: null,
            reviewFormReviewStar: null,
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
                 reviewFormIndex={index}
                 
            />))

        }
    }

    componentDidUpdate(prevProps,prevState){
        
    }

    handleClickReviewButton(reviewStateFromSingle,reviewFormIndex){
        console.log(reviewStateFromSingle)
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

    handleFormSubmit(e){
        e.preventDefault();
        //submit review to server
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
                            <textarea disabled placeholder={this.state.reviewFormReviewContent} name="comment_textarea" className="comment_textarea" cols="100" rows="3"></textarea>
                        <div className="review">
                        <h4>Rating: {this.state.reviewFormReviewStar}.0 / 5.0</h4>
                            <span className="star">
                                {this.state.reviewFormReviewStar === null ?  <EditableRatingReact/> :
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
                        <textarea placeholder="Write your comment here..." name="comment_textarea" className="comment_textarea" cols="100" rows="3"></textarea>
                
                        <div className="review">
                            <span className="star">
                                {this.state.reviewFormReviewStar === null ?  <EditableRatingReact/> :
                                <NonEditableRatingReact rating={this.state.reviewFormReviewStar}/>}
                            </span>
                            <span className="star-txt"></span>
                        </div>
                        <div className="comment_submit">
                            <button type="submit" className="submit_button">Submit</button>
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

        console.log(this.state)
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
                            <tr className="tablehead">
                                <td width="15%">Suburb</td>
                                <td width="15%">Price</td>
                                <td width="20%">Address</td>
                                <td width="15%">StartTime</td>
                                <td width="15%">EndTime</td>
                                <td width="15%">Status</td>
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