import React, { Component } from 'react';

class WatchingListSingle extends Component {
    constructor(props){
        super(props)
        this.state = {
            isChecked: false,
            suburb: "",
            postcode: "",
            address : "",
            startTime: "",
            endTime: ""
            
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }


    handleClick = () => {
        // console.log(this.state.isChecked);
        this.setState({
            isChecked: !this.state.isChecked,
        });
        // console.log(this.state.isChecked);
        this.props.handleChangeClick(this.state.isChecked);
    }

    
    handleRemove = () => {
        return 0
    }

    render() {
        return (
                <tr>
                    <td width="5"><input type="checkbox" name="" id=""/></td>
                    <td width="15%">Surburb</td>
                    <td width="10%">Postcode</td>
                    <td width="45%">Address</td>
                    <td width="10%">StartTime</td>
                    <td width="10%">EndTime</td>
                    <td width="5" id="">
                        <input type="button" value="Remove" className="remove_button" onClick={this.handleClick}/>
                    </td>
                </tr>
        )
    }
}


export default WatchingListSingle;