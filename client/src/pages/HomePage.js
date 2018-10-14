import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import NavigationBarWithoutSession from '../components/NavigationBarWithoutSession';
import NavigationBarWithSession from '../components/NavigationBarWithSession';
import RecommendationForm from '../components/RecommendationForm';
import HomePageFooter from '../components/HomePageFooter';
import HomePageBanner from '../components/HomePageBanner';
import HomePageAdvertisementContainer from '../components/HomePageAdvertisementContainer'

const HomePageHeader = () => {
    return (
        <div>
            <Helmet>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <title>Accomondation System</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    {/* <link rel="stylesheet" type="css" media="screen" href="../css/style.css" />
                    <link type="css" rel="stylesheet" href="css/bootstrap.min.css"/> */}
                    {/* <script src={require('../js/index')}></script> */}
            </Helmet>
        </div>
    )
} 


class HomePage extends Component {
    render() {
        return (
            <div>
                <HomePageHeader/>
                {/* Need to check if user has been logged in */}
                
                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}
                {/* <Banner/> */}

                <HomePageBanner/>

                <HomePageAdvertisementContainer/>

                <RecommendationForm/>

                <HomePageFooter/>
            </div>
        )
    }
}


export default HomePage;