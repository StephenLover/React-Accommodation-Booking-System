import React, { Component } from 'react';

import AccomendationDetailsSimilarContainer from '../components/AccomenadtionDetailsSimilarContainer';

import '../css/style.css';
import '../css/bootstrap.min.css';


const AccDetailsHeader = () => {

}


class AccomendationDetailsCard extends Component{
    constructor(props){
        super(props)
        this.setState = {

        }
    }
    
    render() {
        return (
            <div>
                <div id="contact" className="section">
                    <div className="container">
                        <div className="word_acc_detail">
                            <h1 id="accomondation_name">Accomondation Name</h1> 
                        </div>

                        <div className="row">
                            {/* <!-- Left side of the Body part--> */}
                            <div className="col-md-6">
                                <img src={require(`../img/bg-01.jpg`)} alt="" className="acc_img"/>
                                {/* <!-- If there is no session, the comment part will not avalible --> */}
                                {/* <!-- Comment part with session --> */}
                                <div className="comment_title">
                                    <h4>Comments:</h4>
                                </div>
                                
                                <div className="comments">
                                    <p>This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation</p>
                                </div>
                            </div>

                            <div className="col-md-6">
                    
                                <table className="zebra acc_description">
                                    <tbody>
                                        <tr>
                                            <td width="20%">Address:</td>
                                            <td width="80%" id="address">Address</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Surburb:</td>
                                            <td width="80%" id="surburb">Surburb</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Postcode:</td>
                                            <td width="80%" id="postcode">Postcode</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Capacity:</td>
                                            <td width="80%" id="capacity">Capacity</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Review:</td>
                                            <td width="80%" id="rank">
                                                <div>
                                                    <span id="accomondation_rank">rank</span>
                                                    <img src={require("../img/stars.png")} alt='star'/>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                    <div className="map"></div>
                                        <form action="/" method="post" className="add_to_wl">
                                            <div className="add_to_wl_button">
                                                <button type="submit" className="submit">Add to Watching List</button>
                                            </div>
                                        </form>
                                    </div>
                                <AccomendationDetailsSimilarContainer/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccomendationDetailsCard;