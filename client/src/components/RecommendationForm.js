import React, { Component } from 'react';
import AccomendationCard from './AccomendationCard';

class RecommendationForm extends Component{
    render() {
        return (
            <div className="recommendationform">
                <div id="contact" className="section">
                    <div className="container">
                        <div className="word">
                            <h4>Recommand For You :</h4> 
                        </div>
                        
                        <div className="row">
                            <div className="recommand">
                                <ul>
                                    <AccomendationCard/>
                                    <AccomendationCard/>
                                    <AccomendationCard/>
                                    <AccomendationCard/>
                                    <AccomendationCard/>
                                    <AccomendationCard/>
                                </ul>
                            </div>
                        </div>                
                    </div>
                </div>
            </div>
        )
    }
}

export default RecommendationForm;