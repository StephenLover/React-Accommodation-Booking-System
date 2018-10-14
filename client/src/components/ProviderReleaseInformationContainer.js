import React, { Component } from 'react';
import ProviderReleaseProertyForm from './ProviderReleaseNewPropertyForm';
import ProviderReleaseOwnPropertySingleContainer from './ProviderReleaseOwnPropertySingleContainer';

class ProviderReleaseInformationContainer extends Component{
    render() {
        return (
            <div id="contact" className="section">
                <div className="container">
            {/* <!-- The Words are belong to Provider --> */}
            <div className="word_release_information">
                <h1>Property Release Information</h1> 
            </div>

            <ProviderReleaseProertyForm/>

            <div className="row">
                {/* <!-- Below are release information for Provider --> */}
                
                <div className="release_accomondation">
                    <div className="word_release_accomondation">
                        <h3>Owned Property :</h3>
                    </div>
                    
                    <table className="zebra release_accomondation_table">
                        <tbody>
                            <tr className="tablehead">
                                <td width="25%">Suburb</td>
                                <td width="25%">Address</td>
                                <td width="25%">Capacity</td>
                                <td width="25%">Add Time</td>
                            </tr>
                            
                            <ProviderReleaseOwnPropertySingleContainer/>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ProviderReleaseInformationContainer;