import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import WatchingListForm from "../components/WatchingListForm";
import HomePageFooter from "../components/HomePageFooter";
import NavigationBarWithoutSession from "../components/NavigationBarWithoutSession";
import NavigationBarWithSession from "../components/NavigationBarWithSession";


const WatchingListHeader = () => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>WatchingList</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" type="css" media="screen" href="css/bootstrap.min.css" />
                <link rel="stylesheet" href="css" type="css"/>
            </Helmet>
        </div>
    )
} 


class WatchingListPage extends Component {
    render() {
        return (
            <div>
                <WatchingListHeader/>

                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}

                <WatchingListForm/>

                <HomePageFooter/>
            </div>
        )
    }
}


export default WatchingListPage;