import React, { Component } from 'react';
 
class UserProfileTravellerSingle extends Component{
    constructor(props){
        super(props)
        this.state = {
            reviewFormStatus : this.props.reviewFormStatus,
            reviewFormIndex : this.props.reviewFormIndex
        }
        this.handleReviewClick = this.handleReviewClick.bind(this);
        this.renderReviewButtons = this.renderReviewButtons.bind(this);
    }
    

    handleReviewClick(){
        this.setState({
            reviewFormStatus : !this.state.reviewFormStatus
        })
        this.props.handleClickReviewButton(this.state.reviewFormStatus, this.state.reviewFormIndex)
    }

    renderReviewButtons(){
        if(this.props.status === 'pending'){
            return(
                <a href="/pendinglist">
                    <td width="5%"><input style={{color: '#FF0000'}} type="button" value="Need Confirm" className="submit_button"/></td>
                </a>
            )
        }else if(this.props.status === 'success'){
            if(this.props.review === null){
                return (
                    <td width="5%"><input type="button" value="Write Review" className="submit_button" onClick={this.handleReviewClick}/></td>
                )
            }else if(this.props.status !== null){
                return (
                    <td width="5%"><input type="button" value="Check Review" className="submit_button" onClick={this.handleReviewClick}/></td>
                )
            } 
        }else if(this.props.status === 'cancel'){
            return(
                <td width="5%"><input disabled style={{color: "#FFFFFF", backgroundColor: "#000000"}} type="button" value="Cancelled" className="submit_button"/></td>
            )
        }
    }

  render() {
    console.log(this.props.accId)
    const { suburb, price, address, startTime, endTime ,review, status, star, accId} = this.props;
    const statusObj = {
        pending : 'Pending',
        success : 'Finished',
        cancel: 'Cancelled'
    }
    const hrefLink = '/accommodation/' + this.props.accId
    return (                
            <tr>
                <td width="15%">{suburb}</td>
                <td width="15%">{price} AUD</td>
                <a className="profilelink" href={hrefLink}><td width="20%">{address}</td></a>
                <td width="15%">{startTime}</td>
                <td width="15%">{endTime}</td>
                <td width="5%">{statusObj[status]}</td>
                {this.renderReviewButtons()}
            </tr>
    );
  }
}
 
export default UserProfileTravellerSingle