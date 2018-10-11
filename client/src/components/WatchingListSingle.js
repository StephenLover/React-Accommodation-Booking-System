import React, { Component } from 'react';

class WatchingListSingle extends Component {
    constructor(props){
        super(props)
        this.state = {
            accId: this.props.accId,
            isChecked: false,
            suburb: this.props.suburb,
            postcode: this.props.postcode,
            address : this.props.address,
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            formTicked : this.props.formTicked,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }


    componentDidUpdate(prevState,prevProps){

        if(prevProps.formTicked !== this.props.formTicked){
            this.setState({
                formTicked : this.props.formTicked
            })
        }
        // console.log('formTicked' ,this.state.formTicked, 'isChecked',this.state.isChecked)
        if(this.state.formTicked === true && this.state.isChecked === false){
            document.getElementById(this.props.accId).disabled = true;
        }else if(this.state.formTicked === false){
            document.getElementById(this.props.accId).disabled = false;
        }
    }


    handleClick = () => {
        // console.log(this.state.isChecked);
        this.setState({
            isChecked: !this.state.isChecked,
        });
        // console.log(this.state.isChecked);
        this.props.handleChangeClick(this.state.accId, this.state.isChecked);
    }

    
    handleRemove = (e) => {
        e.preventDefault();
        let url = '/api/delwatching';
        let data = {_id: localStorage.getItem('uid'), accId: this.state.accId};
        console.log(JSON.stringify(data))
        fetch(url, {
        method: 'DELETE', 
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .then(response => alert('Property Deleted', JSON.stringify(response)))
        .then(window.location.href="./watching")
        .catch(error => console.error('Error:', error));
    }

    render() {
        return (
                <tr>
                    <td width="5"><input type="checkbox" name="" id={this.state.accId} onClick={this.handleClick}/></td>
                    <td style={{textAlign:'center'}} width="15%">{this.state.suburb}</td>
                    <td style={{textAlign:'right'}} width="10%">{this.state.postcode}</td>
                    <td style={{textAlign:'center'}} width="45%">{this.state.address}</td>
                    <td width="18%">{this.state.startTime}</td>
                    <td width="12%">{this.state.endTime}</td>
                    <td width="5" id="">
                        <input type="button" value="Remove" className="remove_button" onClick={this.handleRemove}/>
                    </td>
                </tr>
        )
    }
}


export default WatchingListSingle;