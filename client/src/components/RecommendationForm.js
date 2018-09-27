import React, { Component } from 'react';
import RecommendationCard from '../components/RecommendationCard';

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
                                    <RecommendationCard/>
                                    <RecommendationCard/>
                                    <RecommendationCard/>
                                    <RecommendationCard/>
                                    <RecommendationCard/>
                                    <RecommendationCard/>
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