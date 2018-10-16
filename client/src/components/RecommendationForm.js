import React, { Component } from 'react';
import AccomendationCard from './AccomendationCard';

class RecommendationForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            recommendationAccs : [],
        }
    }

    componentWillMount(){
        fetch(`/api/toprated`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                recommendationAccs : res.sort((a,b) =>{
                    return b.property.avgStar - a.property.avgStar
                }),
            })
        })
        .catch((err) => {console.log(err)})
    }


    testIfNone(){       
        if (this.state.recommendationAccs[0] !== undefined){
            console.log(this.state.recommendationAccs)
            return(
                <div className="row">
                    <div className="recommand">
                        <ul>
                            <AccomendationCard property={this.state.recommendationAccs[0]}/>
                            <AccomendationCard property={this.state.recommendationAccs[1]}/>
                            <AccomendationCard property={this.state.recommendationAccs[2]}/>
                            <AccomendationCard property={this.state.recommendationAccs[3]}/>
                            <AccomendationCard property={this.state.recommendationAccs[4]}/>
                            <AccomendationCard property={this.state.recommendationAccs[5]}/>
                        </ul>
                    </div>
                </div>         
            );
        }      
    }


    render() {
        this.testIfNone()
        return (
            <div className="recommendationform">
                <div id="contact" className="section">
                    <div className="container">
                        <div className="word">
                            <h4>Top-rated Accomendation :</h4> 
                        </div>
                        {this.testIfNone()}            
                    </div>
                </div>
            </div>
        )
    }
}

export default RecommendationForm;