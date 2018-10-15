import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import NavigationBarWithoutSession from '../components/NavigationBarWithoutSession';
import NavigationBarWithSession from '../components/NavigationBarWithSession';
import HomePageFooter from '../components/HomePageFooter';

const RequirementsPageHeader = () => {
    return (
        <div>
            <Helmet>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <title>Accomondation Needed Requirements</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {/* <link rel="stylesheet" type="text/css" media="screen" href="css/style.css" />
            <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"> */}
            </Helmet>
        </div>
    )
}


class RequirementsPage extends Component {
    render() {
        return (
            <div>
                <RequirementsPageHeader/>

                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}

                <HomePageFooter/>
            </div>
        )
    }
}


export default RequirementsPage;