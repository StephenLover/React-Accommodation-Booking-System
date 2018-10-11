import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import HomePageFooter from "../components/HomePageFooter";
import NavigationBarWithoutSession from "../components/NavigationBarWithoutSession";
import NavigationBarWithSession from "../components/NavigationBarWithSession";

//sub components import
import UserProfileForm from "../components/UserProfileForm";

const UserProfileHeader = () => {
    return (
        <div>
            <Helmet>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <title>Personal Profile</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {/* <link rel="stylesheet" type="text/css" media="screen" href="css/style.css" />
            <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"/> */}
            {/* <script src="js/PersonalProfile.js" rel="javascript" type="text/javascript"></script> */}
            </Helmet>
        </div>
    )
} 


class UserProfilePage extends Component {
    render() {
        return (
            <div>
                <UserProfileHeader/>

                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}

                <UserProfileForm/>

                <HomePageFooter/>
            </div>
        )
    }
}


export default UserProfilePage;