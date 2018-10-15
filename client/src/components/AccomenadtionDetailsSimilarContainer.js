import React, { Component } from 'react';
import AccomendationCard from './AccomendationCard'
import RecommendationForm from '../components/RecommendationForm'



//This is single card component for Similar card in AccomendationDetailsPage 
// Parent Component for AccomendationDetailsSimilarCard

class AccomendationDetailsSimilarContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            suburb : this.props.suburb,
            recommendationAccs : [],
        }
        this.renderIfDataPrepared = this.renderIfDataPrepared.bind(this);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.suburb !== undefined){
            this.setState({
                suburb : nextProps.suburb
            })
            fetch(`/api/search/suburb/${nextProps.suburb}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    // comments: res.property.comments,
                    recommendationAccs : res,
                })
            })
            .catch((err) => {console.log(err)})
        }
    }



    renderIfDataPrepared(){
        // console.log(this.state.recommendationAccs, this.state.suburb, this.props.suburb)
        if(this.state.recommendationAccs.length >=3){
            console.log(this.state.recommendationAccs.length)
            const randomValue =Math.floor(Math.random() * (Math.floor(this.state.recommendationAccs.length) - 5) + 0)
            console.log(randomValue)
            return (
                <div className="similar">
                    <div className="word_similar">
                        <h4>Some Similar Near From You :</h4> 
                    </div>

                    <div className="recommand">
                        <ul>
                            <AccomendationCard property={this.state.recommendationAccs[randomValue]}/>
                            <AccomendationCard property={this.state.recommendationAccs[randomValue+1]}/>
                            <AccomendationCard property={this.state.recommendationAccs[randomValue+2]}/>
                        </ul>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="acc_container">
                {this.renderIfDataPrepared()}
            </div>
        )
    }
}

export default AccomendationDetailsSimilarContainer;