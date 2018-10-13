import React, { Component } from 'react';
 
class UserProfileProviderSingle extends Component {
    

    render() {
        console.log(this.props)
        const {suburb, address, startTime, endTime} = this.props
        return (                
            <tr>
                <td width="15%">{suburb}</td>
                <td width="55%">{address}</td>
                <td width="10%">{startTime}</td>
                <td width="10%">{endTime}</td>
            </tr>
        );
  }
}
 
export default UserProfileProviderSingle