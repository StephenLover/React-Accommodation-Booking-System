import React, { Component } from 'react';
import ProviderReleaseProertyForm from './ProviderReleaseNewPropertyForm';
import ProviderReleaseOwnPropertySingleComponent from './ProviderReleaseOwnPropertySingleComponent';

class ProviderReleaseInformationContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            propertyList : null,

        }
        this.renderIfPropertyListNotEmpty = this.renderIfPropertyListNotEmpty.bind(this);
    }


    componentWillMount(){
        fetch(`/api/property/${localStorage.getItem('uid')}`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                propertyList : res
            })
        })
        .catch((err) => {console.log(err)})
    }

    renderIfPropertyListNotEmpty(){
        if(this.state.propertyList !== null){
            return (
                this.state.propertyList.map((singleProperty, index) => (
                    <ProviderReleaseOwnPropertySingleComponent key={index} suburb={singleProperty.suburb} 
                    address={singleProperty.address} capacity={singleProperty.capacity}
                    property_id={singleProperty._id}/>
                ))
            )
        }
    }

    render() {
        console.log(this.state)
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
                                </tbody> 
                                {this.renderIfPropertyListNotEmpty()}
                            </table>
                            <div className="button_part">
                                <a href="/profile" target="_parent" className="add_button">Back</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProviderReleaseInformationContainer;