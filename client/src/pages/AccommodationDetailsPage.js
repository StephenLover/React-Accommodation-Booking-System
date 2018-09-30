import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import NavigationBarWithoutSession from '../components/NavigationBarWithoutSession';
import NavigationBarWithSession from '../components/NavigationBarWithSession';
import AccomendationDetailsCard from '../components/AccomendationDetailsCard'
import HomePageFooter from '../components/HomePageFooter';

const AccomendationDetailsHeader = () => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>Accomondation Details</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                {/* <link rel="stylesheet" type="css" media="screen" href="../css/style.css" />
                <link type="css" rel="stylesheet" href="css/bootstrap.min.css"/>  */}
            </Helmet>
        </div>
    )
}


class AccommodationDetailsPage extends Component{
    constructor(props){
        super(props)
        this.setState = {

        }
    }
    
    render() {
        return (
            <div>
                <AccomendationDetailsHeader/>

                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}

                <AccomendationDetailsCard/>

                <HomePageFooter/>
            </div>
        )
    }
}

export default AccommodationDetailsPage;