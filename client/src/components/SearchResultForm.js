import React, { Component } from 'react';
import AccomendationCard from '../components/AccomendationCard'



class SearchResultForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            sortRequirement: "price_up",
            currentPageNumber : 1 
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            sortRequirement : e.target.value
        })
        console.log(this.state.sortRequirement)
    }

    handleSubmit(e){
        alert("Your choice is " + this.state.sortRequirement);
        e.preventDefault();
    }


    render(){
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word_search_result">
                        <h1>Search Result</h1> 
                    </div>
                    <div className="filter">
                        <form action="/" method="POST">
                            <span>Sort by:</span>
                            <select name="filter" className="filter_button" value={this.state.value} onChange={this.handleChange}>
                                <option value="price_up">Price Low to High</option>
                                <option value="price_down">Price High to Low</option>
                                <option value="review_up">Rank Low to High</option>
                                <option value="review_down">Rank High to Low</option>
                            </select>
                        </form>
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
                        <div className="pages">
                            <button type="submit" className="previous_page">&lt;</button>
                            {
                                this.state.currentPageNumber === 1 ? null : <button type="submit" className="last_page_number">{this.state.currentPageNumber-1}</button>
                            }
                            
                            <button type="submit" className="current_page_number">{this.state.currentPageNumber}</button>
                            <button type="submit" className="next_page_number">{this.state.currentPageNumber+1}</button>
                            <button type="submit" className="next_page">&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SearchResultForm