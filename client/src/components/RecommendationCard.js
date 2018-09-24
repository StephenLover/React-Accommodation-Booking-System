import React, { Component } from 'react';

class RecommendationCard extends Component{
    render() {
        return (
            <div>
                <li>
                    <div className="accomondation">
                        
                        <a href="#"><img src={require(`../img/bg-01.jpg`)} alt="" className="accomondation_img"/></a>
                        
                        <div className="acc_name">
                            <a href="#"><span id="accomondation_name">Name</span></a>
                        </div>
                        
                        <div className="acc_price">
                            <span id="accomondation_price">Price</span>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
}

export default RecommendationCard;