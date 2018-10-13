import React, { Component } from 'react';
import WatchingListSingle from "../components/WatchingListSingle"

class WatchingListForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggledProperty : {},
            watchingList: [],
            formTicked: false,
        }
        this.renderMulitipleRecords = this.renderMulitipleRecords.bind(this);
        // this.fetchMulitipleRecords = this.fetchMulitipleRecords.bind(this);
        this.handleChangeClick = this.handleChangeClick.bind(this);
        this.handleSubmitToPendingList = this.handleSubmitToPendingList.bind(this);
    }

    componentWillMount(){
        fetch(`/api/watching/${localStorage.getItem('uid')}`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                watchingList : res.watching_list
            })
        })
        .catch((err) => {console.log(err)})
    }

    componentDidUpdate(prevState, prevProps){
        if(prevState.formTicked !== this.state.formTicked){

        }
    }

    renderMulitipleRecords(){
        if(this.state.watchingList.length !== 0 && this.state.watchingList !== undefined & this.state.watchingList !== []){
            return this.state.watchingList.map(acc => (
                <WatchingListSingle accId={acc._id} key={acc._id} suburb={acc.property.suburb}
                address={acc.property.address} postcode={acc.property.postcode} startTime={acc.startDate.slice(0,-14)}
                endTime={acc.endDate.slice(0,-14)} handleChangeClick={this.handleChangeClick.bind(this)}
                formTicked={this.state.formTicked}
                />
            ));
        }
    }

    handleChangeClick(accId, isChecked) {
        //below is the code of updating the state for the toggled course in this.state.toggledcourses.
        // console.log(CourseId, isChecked)
        if(isChecked===false){
            let addToggle = {property: accId}
            this.setState({
                toggledProperty : addToggle,
                formTicked : true
            })
        }else{
            let cleanToggle = {property: null}
            this.setState({
                toggledProperty: cleanToggle,
                formTicked : false
            })
        }
    }

    

    handleSubmitToPendingList(e) {
        e.preventDefault();

        if(this.state.toggledProperty.property !== undefined && this.state.toggledProperty.property !== null){
            let url = '/api/add2pending';
            let data = {_id: localStorage.getItem('uid'), accId: this.state.toggledProperty.property};
            console.log(JSON.stringify(data))
            fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => alert('Property added to pending list!', JSON.stringify(response)))
            .then(window.location.href="./watching")
            .catch(error => console.error('Error:', error));
        }else{
            alert('Please choose one property to add to pending list!')
        }
    }

    render() {
        console.log(this.state);
        return (
                <div id="contact" className="section">
                        <div className="container">
                            <div className="word_watching_list">
                                <h1>Watching List</h1> 
                            </div>
                            <div className="row">
                                <form action="/" method="post" className="watching_list">
                                    <table className="watching_table zebra">
                                        <tbody>
                                        <tr>
                                            <td width="5">Tick</td>
                                            <td style={{textAlign:'center'}} width="15%">Suburb</td>
                                            <td style={{textAlign:'right'}}  width="10%">Postcode</td>
                                            <td style={{textAlign:'center'}} width="45%">Address</td>
                                            <td width="18%">Start Time</td>
                                            <td width="12%">End Time</td>
                                            <td style={{textAlign:'center'}} width="5" id="">Remove</td>
                                        </tr>
                                            {this.renderMulitipleRecords()}
                                        </tbody>
                                    </table>

                                    <div className="button_part">
                                        <button type="submit" className="add_button" onClick={this.handleSubmitToPendingList}>Add to Pending List</button>
                                        <a href="AccomondationDetail.html" className="add_button">Back</a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        )
    }
}


export default WatchingListForm;