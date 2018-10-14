import React, { Component } from 'react';
 
class UserProfileProviderSingle extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedAdValue : '15',
            accId : this.props.accId,
        }
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.handleSelectorPaymentSubmit = this.handleSelectorPaymentSubmit.bind(this);
    }
    
    handleSelectorChange(e){
        this.setState({selectedAdValue: e.target.value});
    }

    handleSelectorPaymentSubmit(e){
        e.preventDefault()
        let url = '/api/ad';
        let data = {
            accommodationId: parseInt(this.state.accId),
            ad: parseInt(this.state.selectedAdValue)
        };
        console.log(JSON.stringify(data))
        fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => alert('Your advertisement payment is successful!!'))
        .then(window.location.href="/profile")
        .catch(error => console.error('Error:', error));
        
    }

    render() {
        console.log(this.state)
        const {suburb, address, startTime, endTime, adValue} = this.props
        return (                
            <tr>
                <td width="20%">{suburb}</td>
                <td width="20%">{address}</td>
                <td width="15%">{startTime}</td>
                <td width="15%">{endTime}</td>
                <td style={{textAlign: "center"}} width="15%">{adValue}</td>
                <td width="15%">
                    <select name="adv_price" className="adv_price_button" value={this.state.selectedAdValue} onChange={this.handleSelectorChange}>
                        <option value="15">$15</option>
                        <option value="25">$25</option>
                        <option value="50">$50</option>
                        <option value="100">$100</option>
                    </select>
                    <button type="submit" className="submit_button" onClick={this.handleSelectorPaymentSubmit}>Pay</button>
                </td>
            </tr>
        );
  }
}
 
export default UserProfileProviderSingle