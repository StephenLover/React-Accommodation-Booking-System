import React, { Component } from 'react';


//This is single card component for Similar card in AccomendationDetailsPage 
//Children component for AccomendationDetailsSimilarContainer

class AccomendationDetailsSimilarCard extends Component{
    render() {
        return (
            <div className="recommand">
                <li>
                    <div className="accomondation">
                        <a href="#"><img src={require(`../img/bg-01.jpg`)} alt="" className="accomondation_img"/></a>
                        <div className="acc_brief">
                            <span id="accomondation_capacity">Capacity: ,</span>
                            <span id="accomondation_suburb">Surburb</span>
                        </div>
                        <div className="acc_name">
                            <a href="#"><span id="accomondation_name">Name</span></a>
                        </div>
                        <div className="acc_price">
                            <span id="accomondation_price">Price</span>
                        </div>
                        <div className="acc_rank">
                            <span id="accomondation_rank">rank</span>
                            <img src={require("../img/stars.png")} alt='star' className="rank_star"/>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
}

export default AccomendationDetailsSimilarCard;