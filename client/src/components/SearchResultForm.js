import React, { Component } from 'react';
import AccomendationCard from '../components/AccomendationCard'
import PropTypes from 'prop-types';
import Pagination from '../components/Pagination';



class SearchResultForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            sortRequirement: "default",
            recommendationAccs: [],
            pageOfItems: [],
        }
        this.onChangePage = this.onChangePage.bind(this);
    }


    componentWillMount() {
        if(localStorage.getItem('keywords') !== undefined){
            if(/^-{0,1}\d+$/.test(localStorage.getItem('keywords')) === false){
                fetch(`/api/search/suburb/${localStorage.getItem('keywords')}`)
                .then(response => response.json())
                .then(res => {
                    this.setState({
                        // comments: res.property.comments,
                        recommendationAccs : res,
                    })
                })
                .catch((err) => {console.log(err)})
            }else{
                fetch(`/api/search/postcode/${localStorage.getItem('keywords')}`)
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


    }


    onChangePage(pageOfItems) {
        // update local state with new page of items
        this.setState({ pageOfItems });
    }

    renderIfDataPrepared(){    
        if (this.state.recommendationAccs[0] !== undefined){
            return(
                <div className="recommand">
                    <ul>
                        {this.state.pageOfItems.map((item) => <AccomendationCard key={item._id} property={item}/>)}
                    </ul>
                </div>       
            );
        }      
    }
    
    // onClickChangeNextPage(){
    //     this.setState({
    //         currentPageNumber : this.state.currentPageNumber + 1,
    //         renderItemList : this.state.recommendationAccs.slice(this.state.currentPageNumber*6,(this.state.currentPageNumber+1)*6)
    //     })
    // }


    render(){
        console.log(this.state.recommendationAccs)
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word_search_result">
                        {/^-{0,1}\d+$/.test(localStorage.getItem('keywords')) === false ? <h1>Search Result of property in {localStorage.getItem('keywords')}</h1> : <h1>Search Result of property in postcode {localStorage.getItem('keywords')}</h1> }
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
                    <div className="row">
                        {this.renderIfDataPrepared()}
                        <div className="pages">
                            <Pagination items={this.state.recommendationAccs} onChangePage={this.onChangePage}/>
                        </div>
                    </div>         
                </div>
            </div>
        )
    }
}


export default SearchResultForm