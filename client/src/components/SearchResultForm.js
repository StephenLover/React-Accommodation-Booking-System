import React, { Component } from 'react';
import AccomendationCard from '../components/AccomendationCard'



class SearchResultForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            sortRequirement: "default",
            currentPageNumber : 0,
            recommendationAccs: [],
        }
    }

    componentWillMount() {
        fetch(`/api/search/suburb/${localStorage.getItem('keywords')}`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                // comments: res.property.comments,
                recommendationAccs : res,
            })
        })
        .catch((err) => {console.log(err)})
    }

    

    renderIfDataPrepared(){       
        if (this.state.recommendationAccs[0] !== undefined){
            return(
                <div className="row">
                    <div className="recommand">
                        <ul>
                            <AccomendationCard property={this.state.recommendationAccs[0+this.state.currentPageNumber*6]}/>
                            <AccomendationCard property={this.state.recommendationAccs[1+this.state.currentPageNumber*6]}/>
                            <AccomendationCard property={this.state.recommendationAccs[2+this.state.currentPageNumber*6]}/>
                            <AccomendationCard property={this.state.recommendationAccs[3+this.state.currentPageNumber*6]}/>
                            <AccomendationCard property={this.state.recommendationAccs[4+this.state.currentPageNumber*6]}/>
                            <AccomendationCard property={this.state.recommendationAccs[5+this.state.currentPageNumber*6]}/>
                        </ul>
                    </div>
                    <div className="pages">
                        <button type="submit" className="previous_page">&lt;</button>
                        {
                            this.state.currentPageNumber === 0 ? null : <button type="submit" className="last_page_number">{this.state.currentPageNumber-1}</button>
                        }
                        <button type="submit" className="current_page_number">{this.state.currentPageNumber}</button>
                        <button type="submit" className="next_page_number">{this.state.currentPageNumber+1}</button>
                        <button type="submit" className="next_page" onClick={() => {this.setState({
                            currentPageNumber : this.state.currentPageNumber + 1
                        })}}>&gt;</button>
                    </div>
                </div>         
            );
        }      
    }



    render(){
        console.log(this.state.recommendationAccs)
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word_search_result">
                        <h1>Search Result of property in {localStorage.getItem('keywords')}</h1> 
                    </div>
                    <div className="filter">
                        <form action="/" method="POST">
                            <span>Sort by:</span>
                            <select name="filter" className="filter_button" value={this.state.value} onChange={this.handleChange}>
                                <option value="defalut">Default</option>
                                <option value="price_up">Price Low to High</option>
                                <option value="price_down">Price High to Low</option>
                                <option value="review_up">Rank Low to High</option>
                                <option value="review_down">Rank High to Low</option>
                            </select>
                        </form>
                    </div>
                    {this.renderIfDataPrepared()}
                </div>
            </div>
        )
    }
}


export default SearchResultForm