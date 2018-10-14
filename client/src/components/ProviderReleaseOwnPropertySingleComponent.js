import React, { Component } from 'react';

class ProviderReleaseOwnPropertySingleComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            suburb : this.props.suburb,
            address : this.props.address,
            capacity : this.props.capacity,
            dropDownState : false,
            property_id : this.props.property_id
        }
        this.handleDropDownClick = this.handleDropDownClick.bind(this);
        this.renderDropDown = this.renderDropDown.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this)

    }

    handleDropDownClick(){
        this.setState({
            dropDownState : !this.state.dropDownState
        })
    }

    handleFormSubmit(e){
        // /api/accommodation/new
        e.preventDefault()
        let startTime = this.refs.startTime.value;
        let endTime = this.refs.endTime.value;
        let price = this.refs.price.value;
        console.log(startTime,endTime,price)
        if(this.state.dropDownState === true && this.stateproperty_id !== null){
            let url = '/api/accommodation/new';
            let data = {
                property: this.state.property_id,
                startDate: startTime,
                endDate: endTime,
                price: price,
            };
            console.log(JSON.stringify(data))
            fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => alert('Accomendation Spare Time has been added!', JSON.stringify(response)))
            // .then(window.location.href="./provider")
            .catch(error => console.error('Error:', error));
        }else{
            alert('Please choose one property to add to pending list!')
        }
    }

    renderDropDown(){
        if(this.state.dropDownState === true){
            return(
                // Single Form
                // <tr id="addlist" style={{display:"none"}}>
                <tr id="addlist" >
                    <td width="25%">
                        <span>Start Time:</span>
                        <input type="text" name="startTime" ref="startTime" placeholder="YYYY-MM-DD"/>
                    </td>
                    <td width="25%">
                        <span>End Time:</span>
                        <input type="text" name="endTime" ref="endTime" placeholder="YYYY-MM-DD"/>
                    </td>
                    <td width="25%">
                        <span>Price: $</span>
                        <input type="text" name="price" ref="price" placeholder="Whole Numbers"/>
                    </td>
                    <td width="25%">
                        <button type="submit" className="submit_button" onClick={this.handleFormSubmit}>Submit</button>
                    </td>
                </tr>
            )
        }
    }

    render() {
        console.log(this.state)
        return (
            <tbody>
                {/* Single Info */}
                <tr>
                    <td width="25%">{this.state.suburb}</td>
                    <td width="25%">{this.state.address}</td>
                    <td width="25%">{this.state.capacity}</td>
                    <td width="25%"><button type="submit" className="submit_button" onClick={this.handleDropDownClick}>Add Spare Time</button></td>
                </tr>
                {this.renderDropDown()}

            </tbody>
        )
    }
}

export default ProviderReleaseOwnPropertySingleComponent;