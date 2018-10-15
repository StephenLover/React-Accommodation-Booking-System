import React, { Component } from 'react';
import RequirementPostSingle from './RequirementPostsSingle';

class RequirementPostsForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            requirementsPostList : null,
        }
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

    // renderIfPropertyListNotEmpty(){
    //     if(this.state.propertyList !== null){
    //         return (
                    
    //             ))
    //         )
    //     }
    // }

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
                                    <RequirementPostSingle/>
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