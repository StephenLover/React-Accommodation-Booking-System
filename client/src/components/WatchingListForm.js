import React, { Component } from 'react';
import WatchingListSingle from "../components/WatchingListSingle"

class WatchingListForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggledProperty : {}
        }
        this.renderMulitipleRecords = this.renderMulitipleRecords.bind(this);
        this.handleChangeClick = this.handleChangeClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderMulitipleRecords(){
        return (
            <WatchingListSingle/>
        )
    }

    handleChangeClick() {

    }

    handleSubmit() {

    }

    render() {
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
                                            {this.renderMulitipleRecords()}
                                        </tbody>
                                    </table>

                                    <div className="button_part">
                                        <button type="submit" className="add_button" onClick={this.handleSubmit}>Add to Pending List</button>
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