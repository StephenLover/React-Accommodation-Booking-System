import React, { Component } from 'react';

class ProviderReleaseNewPropertyForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            dropDownState : false,
            address: null,
            suburb: null,
            postcode: null,
            capacity: null,
        }
        this.handleDropDownButton = this.handleDropDownButton.bind(this);
        this.renderReleaseForm = this.renderReleaseForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDropDownButton(){
        this.setState({
            dropDownState : !this.state.dropDownState
        })
    }

    handleInputChange(e){
        e.preventDefault()
        this.setState({
            address: this.refs.address.value,
            suburb : this.refs.suburb.value,
            postcode: this.refs.postcode.value,
            capacity : parseInt(this.refs.capacity.value)
        })
    }

    handleSubmit(e){
        e.preventDefault()
        if(this.state.address !== "" && this.state.suburb !== "" & this.state.postcode !== ""){
            let address = this.refs.address.value;
            let suburb = this.refs.suburb.value;
            let postcode = this.refs.postcode.value;
            let capacity = this.refs.capacity.value;
            let owner = localStorage.getItem("uid")
            if(this.state.dropDownState === true && this.stateproperty_id !== null){
                let url = '/api/property/new';
                let data = {
                    address: address,
                    suburb: suburb,
                    postcode: postcode,
                    capacity: capacity,
                    owner: owner
                };
                console.log(JSON.stringify(data))
                fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json'
                }
                }).then(res => res.json())
                .then(response => alert('New Property Information Released!', JSON.stringify(response)))
                .then(window.location.href="./provider")
                .catch(error => console.error('Error:', error));
            }else{
                alert('Please choose one property to add to pending list!')
            }
        }
    }


    renderReleaseForm(){
        if(this.state.dropDownState === true){
            return (
                <form action="/" method="post" id="property_input_form" >
                    <div className="input_group">
                        <label className="property_address">Address:</label>
                        <input type="text" className="property_address_input" name="address" ref="address" onChange={this.handleInputChange} required/>
                    </div>
                    <div className="input_group">
                        <label className="property_surburb">Surburb:</label>
                        <input type="text" className="property_suburb_input" name="suburb" ref="suburb"  onChange={this.handleInputChange} required/>
                    </div>
                    <div className="input_group">
                        <label className="property_postcode">Postcode:</label>
                        <input type="text" className="property_postcode_input" name="postcode" ref="postcode" onChange={this.handleInputChange} required/>
                    </div>
                    <div className="input_group">
                        <label className="property_capacity">Capacity:</label>
                        <select name="capacity" className="property_capacity_button" name="capacity" ref="capacity" onChange={this.handleInputChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </select>
                    </div>
                    <div className="property_submit">
                        <button type="submit" className="add_button" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </form>
            )
        }
    }

    render() {
        console.log(this.state)
        return (
            <div className="release_property">
                <div className="release_property_button">
                    <input type="button" value="Release New Property" className="add_button" onClick={this.handleDropDownButton}/>
                </div>
                
                {this.renderReleaseForm()}

                
            </div>
        )
    }
}

export default ProviderReleaseNewPropertyForm;