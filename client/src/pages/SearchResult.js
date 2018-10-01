import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import NavigationBarWithoutSession from '../components/NavigationBarWithoutSession';
import NavigationBarWithSession from '../components/NavigationBarWithSession';
import HomePageFooter from '../components/HomePageFooter';
import SearchResultForm from '../components/SearchResultForm';

const SearchResultHeader = () => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>Search Result</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="css" media="screen" href="css/bootstrap.min.css" />
                <link rel="stylesheet" href="css/style.css" type="css"/>
            </Helmet>
        </div>
    )
} 


class SearchResultPage extends Component {
    render() {
        return (
            <div>
                <SearchResultHeader/>

                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}

                <SearchResultForm/>
    
                <HomePageFooter/>


            </div>
        )
    }
}


export default SearchResultPage;