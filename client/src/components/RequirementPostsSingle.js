import React, { Component } from 'react';


class RequirementPostsForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            suburb : this.props.suburb,
            postcode :  this.props.postcode,
            capacity :  this.props.capacity,
            startDate:  this.props.startDate,
            endDate:  this.props.endDate,
            minPrice:  this.props.minPrice,
            maxPrice:  this.props.maxPrice,
        }
    }



    
    render() {
        console.log(this.state)
        return (
            <tr>
                <td width="14%">{this.state.suburb}</td>
                <td width="14%">{this.state.postcode}</td>
                <td width="14%">{this.state.capacity}</td>
                <td width="14%">{this.state.startDate.slice(0,10)}</td>
                <td width="14%">{this.state.endDate.slice(0,10)}</td>
                <td width="15%">{this.state.minPrice}</td>
                <td width="15%">{this.state.maxPrice}</td>
            </tr>
        )
    }
}

export default RequirementPostsForm;