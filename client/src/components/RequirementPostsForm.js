import React, { Component } from 'react';
import RequirementPostSingle from './RequirementPostsSingle';

class RequirementPostsForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            requirementsPostList : null,
        }
        this.renderIfPropertyListNotEmpty = this.renderIfPropertyListNotEmpty.bind(this);
    }


    componentWillMount(){

        if(localStorage.getItem('keywords') !== undefined){
            if(/^-{0,1}\d+$/.test(localStorage.getItem('keywords')) === false){
                fetch(`/api/search/travelerReq/suburb/${localStorage.getItem('keywords')}`)
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        // comments: res.property.comments,
                        requirementsPostList : res,
                    })
                })
                .catch((err) => {console.log(err)})
            }else{
                fetch(`/api/search/travelerReq/postcode/${localStorage.getItem('keywords')}`)
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        // comments: res.property.comments,
                        requirementsPostList : res,
                    })
                })
                .catch((err) => {console.log(err)})
            }
        }
    }

    renderIfPropertyListNotEmpty(){
        if(this.state.requirementsPostList !== null){
            return (
                    this.state.requirementsPostList.map((singleRecord,index) => (
                        <RequirementPostSingle key={index} suburb={singleRecord.suburb}
                        postcode={singleRecord.postcode} capacity={singleRecord.capacity}
                        startDate={singleRecord.startDate} endDate={singleRecord.endDate}
                        minPrice={singleRecord.minPrice} maxPrice={singleRecord.maxPrice}
                        />
                    ))
                )
            }
        }
    

    render() {
        console.log(this.state)
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word_requirements">
                        <h1>Accomondation Needed Requirements</h1> 
                    </div>
                    <div className="row">
                        <div className="information">
                            <table className="zebra information_table">
                                <tbody>
                                    <tr className="tablehead">
                                        <td width="20%">Suburb</td>
                                        <td width="10%">Postcode</td>
                                        <td width="10%">Capacity</td>
                                        <td width="20%">Start Time</td>
                                        <td width="20%">End Time</td>
                                        <td width="10%">Min Price</td>
                                        <td width="10%">Max Time</td>
                                    </tr>
                                    {this.renderIfPropertyListNotEmpty()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RequirementPostsForm;