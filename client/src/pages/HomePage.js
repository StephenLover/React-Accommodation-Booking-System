import React, { Component } from 'react';
// import '../css/style.css';
import { Helmet } from "react-helmet";
import NavigationBarWithoutSession from '../components/NavigationBarWithoutSession';
import NavigationBarWithSession from '../components/NavigationBarWithSession';
import RecommendationForm from '../components/RecommendationForm';
import Banner from '../components/Banner';
import HomePageFooter from '../components/HomePageFooter';

const HomePageHeader = () => {
    return (
        <div>
            <Helmet>
                    <meta charset="utf-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <title>Accomondation System</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>
                    <link rel="stylesheet" type="css" media="screen" href="../css/style.css" />
                    <link rel="stylesheet" type="css" href="../css/bootstrap.min.css"/>
                    {/* <script src={require('../js/index')}></script> */}
                    {/* <script src={require('../js/jquery-1.7.2')}></script> */}
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
                <NavigationBarWithSession />
                {/* <NavigationBarWithoutSession /> */}
                
                <Banner/>

                <RecommendationForm/>

                <HomePageFooter/>
            </div>
        )
    }
}


export default HomePage;