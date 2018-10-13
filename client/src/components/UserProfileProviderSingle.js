import React, { Component } from 'react';
 
class UserProfileProviderSingle extends Component {
    

    render() {
        console.log(this.props)
        const {suburb, address, startTime, endTime} = this.props
        return (                
            <tr>
                <td width="20%">{suburb}</td>
                <td width="40%">{address}</td>
                <td width="20%">{startTime}</td>
                <td width="20%">{endTime}</td>
            </tr>
        );
  }
}
 
export default UserProfileProviderSingle