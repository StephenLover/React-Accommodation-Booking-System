import React, { Component } from 'react';

class UserProfileTravellerForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            // profileState : props.profile
        }
    }

    render () {
        return (
            <div>
                {/* <div id="comment_area"  style="display:none;"> */}
                <div id="comment_area" >
                    <div class="word_comment">
                        <h3>Review area:</h3>
                    </div>
                    <textarea name="comment_textarea" class="comment_textarea" cols="100" rows="3"></textarea>
                    <div class="review">
                        <span class="star">
                            Star:
                            <b class="ct-star  ic-star-off"></b>
                            <b class="ct-star  ic-star-off"></b>
                            <b class="ct-star  ic-star-off"></b>
                            <b class="ct-star  ic-star-off"></b>
                            <b class="ct-star  ic-star-off"></b>
                        </span>
                        <span class="star-txt"></span>
                    </div>
                    <div class="comment_submit">
                        <button type="submit" class="submit_button">Submit</button>
                    </div>
                </div>
                <div class="traveller_history">
                    <div class="word_history">
                        <h3>History:</h3>
                    </div>
                    <form action="/" method="post">
                        <table class="traveller_table zebra">
                            <tbody>
                                {/* <!-- This is the table title --> */}
                                <tr>
                                    <td width="15%">Surburb</td>
                                    <td width="15%">Price</td>
                                    <td width="45%">Address</td>
                                    <td width="10%">StartTime</td>
                                    <td width="10%">EndTime</td>
                                    <td width="5"><input type="button" value="Review" class="submit_button" onClick="show_comment()"/></td>
                                </tr>
                                {/* <!-- Below is the content of table --> */}
                                <tr>
                                    <td width="15%">Surburb</td>
                                    <td width="10%">Price</td>
                                    <td width="55%">Address</td>
                                    <td width="10%">StartTime</td>
                                    <td width="10%">EndTime</td>
                                    <td width="5"><input type="button" value="Review" class="submit_button" onClick="show_comment()"/></td>
                                </tr>
                                <tr>
                                    <td width="15%">Surburb</td>
                                    <td width="10%">Price</td>
                                    <td width="55%">Address</td>
                                    <td width="10%">StartTime</td>
                                    <td width="10%">EndTime</td>
                                    <td width="5"><input type="button" value="Review" class="submit_button" onClick="show_comment()"/></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="button_part">
                            <a href="ReleaseInformation.html" class="add_button">Release Accomondation Needed Information</a>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

export default UserProfileTravellerForm