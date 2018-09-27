import React, { Component } from 'react';
import AccomendationDetailsSimilarCard from '../components/AccomendationDetailsSimilarCard'

//This is single card component for Similar card in AccomendationDetailsPage 
// Parent Component for AccomendationDetailsSimilarCard

class AccomendationDetailsSimilarContainer extends Component{
    render() {
        return (
            <div>
                <div className="word">
                    <h4>Some Similar Near From You :</h4> 
                </div>

                <div className="recommand">
                    <ul>
                        <AccomendationDetailsSimilarCard/>
                        <AccomendationDetailsSimilarCard/>
                        <AccomendationDetailsSimilarCard/>
                    </ul>
                </div>
            </div>
        )
    }
}

export default AccomendationDetailsSimilarContainer;