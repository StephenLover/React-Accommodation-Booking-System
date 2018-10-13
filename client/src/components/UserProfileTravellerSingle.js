import React, { Component } from 'react';
 
class UserProfileTravellerSingle extends Component{
    constructor(props){
        super(props)
        this.state = {
            reviewFormStatus : this.props.reviewFormStatus,
            reviewFormIndex : this.props.reviewFormIndex
        }
        this.handleReviewClick = this.handleReviewClick.bind(this);
    }
    

    handleReviewClick(){
        this.setState({
            reviewFormStatus : !this.state.reviewFormStatus
        })
        this.props.handleClickReviewButton(this.state.reviewFormStatus, this.state.reviewFormIndex)
    }


  render() {
    const { suburb, price, address, startTime, endTime ,review, status, star} = this.props;
    const statusObj = {
        pending : 'Pending',
        success : 'Finished'
    }
    return (                
            <tr>
                <td width="15%">{suburb}</td>
                <td width="15%">{price} AUD</td>
                <td width="20%">{address}</td>
                <td width="15%">{startTime}</td>
                <td width="15%">{endTime}</td>
                <td width="5%">{statusObj[status]}</td>
                {review === null ? 
                <td width="5%"><input type="button" value="Write Review" className="submit_button" onClick={this.handleReviewClick}/></td> :
                <td width="5%"><input type="button" value="Check Review" className="submit_button" onClick={this.handleReviewClick}/></td>}
            </tr>
    );
  }
}
 
export default UserProfileTravellerSingle