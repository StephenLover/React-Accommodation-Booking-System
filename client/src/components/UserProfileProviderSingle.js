import React, { Component } from 'react';
 
class UserProfileProviderSingle extends Component {
    

    render() {
        console.log(this.props)
        const {suburb, address, startTime, endTime} = this.props
        return (                
            <tr>
                <td width="20%">{suburb}</td>
                <td width="20%">{address}</td>
                <td width="15%">{startTime}</td>
                <td width="15%">{endTime}</td>
                <td width="15%">Ad Value</td>
                <td width="15%">
                    <select name="adv_price" className="adv_price_button">
                        <option defaultValue="15">$15</option>
                        <option defaultValue="25">$25</option>
                        <option defaultValue="50">$50</option>
                        <option defaultValue="100">$100</option>
                    </select>
                    <button type="submit" className="submit_button">Pay</button>
                </td>
            </tr>
        );
  }
}
 
export default UserProfileProviderSingle