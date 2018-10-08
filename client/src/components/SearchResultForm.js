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
        this.sortAccordingRequirement = this.sortAccordingRequirement.bind(this);
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
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

    //sort accomendation according to the price in ascending order
    sortAccordingRequirement(){
        let recommendationAccs = this.state.recommendationAccs;

        if(this.state.sortRequirement === 'defalut'){
            recommendationAccs.sort((a,b) =>{
                return a._id - b._id
            })
            this.setState({
                recommendationAccs : recommendationAccs
            })
        }else if(this.state.sortRequirement === 'price_up'){
            recommendationAccs.sort((a,b) => {
                return a.price - b.price
            })
            this.setState({
                recommendationAccs : recommendationAccs
            })
        }else if(this.state.sortRequirement === 'price_down'){
            recommendationAccs.sort((a,b) => {
                return b.price - a.price
            })            
            this.setState({
                recommendationAccs : recommendationAccs
            })
        }
    }

    //for pagination page change
    onChangePage(pageOfItems) {
        // update local state with new page of items
        this.setState({ pageOfItems });
    }


    // for rendering the accomendation cards componentes
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
    
    componentDidUpdate(prevProps, prevState){
        if(this.state.sortRequirement !== prevState.sortRequirement){
            this.sortAccordingRequirement()
            this.setState({pageOfItems : this.state.recommendationAccs.slice(0,6)})
        }
    }

    //handle selector change for sorting
    handleSelectorChange(event){
        this.setState({sortRequirement: event.target.value});
    }


    render(){
        return (
            <div>
                <div id="contact" className="section">
                    <div className="container">
                        <div className="word_search_result">
                            {/^-{0,1}\d+$/.test(localStorage.getItem('keywords')) === false ? <h1>Search Result of property in {localStorage.getItem('keywords')}</h1> : <h1>Search Result of property in postcode {localStorage.getItem('keywords')}</h1> }
                        </div>
                        <div className="filter">
                            <form action="/" method="POST">
                                <span>Sort by:</span>
                                <select name="filter" className="filter_button" value={this.state.value} onChange={this.handleSelectorChange}>
                                    <option value="defalut" onClick={this.handleSelectorChange}>Default</option>
                                    <option value="price_up" onClick={this.handleSelectorChange}>Price Low to High</option>
                                    <option value="price_down" onClick={this.handleSelectorChange}>Price High to Low</option>
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
            </div>
            
        )
    }
}


export default SearchResultForm