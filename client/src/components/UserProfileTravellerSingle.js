import React, { Component } from 'react';
 
class UserProfileTravellerSingle extends Component{


  render() {
    console.log(this.props)
    const { suburb, price, address, startTime, endTime } = this.props;
    return (                
            <tr>
                <td width="15%">{suburb}</td>
                <td width="15%">{price} AUD</td>
                <td width="45%">{address}</td>
                <td width="10%">{startTime}</td>
                <td width="10%">{endTime}</td>
                <td width="5"><input type="button" value="Review" className="submit_button" onClick="show_comment()"/></td>
            </tr>
    );
  }
}
 
export default UserProfileTravellerSingle