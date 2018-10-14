import React, { Component } from 'react';
import AccomendationCard from './AccomendationCard';

class RecommendationForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            recommendationAccs : [],
            suburb : "Randwick"
        }
    }

    componentWillMount(){
        fetch(`/api/search/suburb/${this.state.suburb}`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                recommendationAccs : res,
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
                            <AccomendationCard property={this.state.recommendationAccs[2]}/>
                            <AccomendationCard property={this.state.recommendationAccs[11]}/>
                            <AccomendationCard property={this.state.recommendationAccs[12]}/>
                            <AccomendationCard property={this.state.recommendationAccs[4]}/>
                            <AccomendationCard property={this.state.recommendationAccs[13]}/>
                            <AccomendationCard property={this.state.recommendationAccs[6]}/>
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
                            <h4>Top-rated Accomendation in {this.state.suburb} :</h4> 
                        </div>
                        {this.testIfNone()}            
                    </div>
                </div>
            </div>
        )
    }
}

export default RecommendationForm;