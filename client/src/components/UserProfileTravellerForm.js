import React, { Component } from 'react';
import UserProfileTravellerSingle from '../components/UserProfileTravellerSingle';

class UserProfileTravellerForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            travellerHistory : null,
        }
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
        console.log(this.state.travellerHistory)
        if(this.state.travellerHistory !== null){
            return this.state.travellerHistory.map((singleRecord, index)=> (<UserProfileTravellerSingle
                 key={index} suburb={singleRecord.accommodationId.property.suburb} price={singleRecord.accommodationId.price}
                 address={singleRecord.accommodationId.property.address} startTime={singleRecord.accommodationId.startDate.slice(0,-14)}
                 endTime={singleRecord.accommodationId.endDate.slice(0,-14)}
            />))

        }
    }



    render () {
        console.log(this.state)
        return (
            <div>
                {/* <div id="comment_area"  style="display:none;"> */}
                <div id="comment_area" >
                    <div className="word_comment">
                        <h3>Review area:</h3>
                    </div>
                    <textarea name="comment_textarea" className="comment_textarea" cols="100" rows="3"></textarea>
                    <div className="review">
                        <span className="star">
                            Star:
                            <b className="ct-star  ic-star-off"></b>
                            <b className="ct-star  ic-star-off"></b>
                            <b className="ct-star  ic-star-off"></b>
                            <b className="ct-star  ic-star-off"></b>
                            <b className="ct-star  ic-star-off"></b>
                        </span>
                        <span className="star-txt"></span>
                    </div>
                    <div className="comment_submit">
                        <button type="submit" className="submit_button">Submit</button>
                    </div>
                </div>
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