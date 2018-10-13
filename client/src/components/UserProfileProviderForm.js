import React, { Component } from 'react';

class UserProfileProviderForm extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render () {

        return (
            <div>
                <div className="provider_history">
                    <div className="word_history">
                        <h3>Owned Accomondation:</h3>
                    </div>
                    <table className="provider_table zebra">
                        <tbody>
                            <tr>
                                <td width="15%">Surburb</td>
                                <td width="10%">Postcode</td>
                                <td width="55%">Address</td>
                                <td width="10%">StartTime</td>
                                <td width="10%">EndTime</td>
                            </tr>
                            <tr>
                                <td width="15%">Surburb</td>
                                <td width="10%">Postcode</td>
                                <td width="55%">Address</td>
                                <td width="10%">StartTime</td>
                                <td width="10%">EndTime</td>
                            </tr>
                            <tr>
                                <td width="15%">Surburb</td>
                                <td width="10%">Postcode</td>
                                <td width="55%">Address</td>
                                <td width="10%">StartTime</td>
                                <td width="10%">EndTime</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="button_part">
                        <a href="ReleaseInformation.html" className="add_button">Release New Property</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfileProviderForm
