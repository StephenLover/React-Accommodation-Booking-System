import React, { Component } from 'react';

import AccomendationDetailsSimilarContainer from './AccomenadtionDetailsSimilarContainer';
import AccomendationDetailsBanner from './AccomendationDetailsBanner';
import AccomendationCard from './AccomendationCard';


const AccDetailsHeader = () => {

}


class AccomendationDetailsCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            //defalut dammy data
            comments: "This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation. This is the Comment of this Accomondation",
            address: "UNSW, Sydney NSW 2052",
            surburb: "Kensington",
            postcode: "2052",
            capacity: "50,000",
            review: "4.7/5",
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
                                <AccomendationDetailsBanner/>
                                {/* <!-- If there is no session, the comment part will not avalible --> */}
                                {/* <!-- Comment part with session --> */}
                                <div className="comment_title">
                                    <h4>Comments:</h4>
                                </div>
                                
                                <div className="comments">
                                    <p>
                                        {this.state.comments};
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                    
                                <table className="zebra acc_description">
                                    <tbody>
                                        <tr>
                                            <td width="20%">Address:</td>
                                            <td width="80%" id="address">{this.state.address}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Surburb:</td>
                                            <td width="80%" id="surburb">{this.state.surburb}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Postcode:</td>
                                            <td width="80%" id="postcode">{this.state.postcode}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Capacity:</td>
                                            <td width="80%" id="capacity">{this.state.capacity}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Review:</td>
                                            <td width="80%" id="rank">
                                                <div>
                                                    <span id="accomondation_rank">{this.state.review}</span>
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