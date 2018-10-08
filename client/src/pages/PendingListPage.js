import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import PendingListForm from "../components/PendingListForm"
import HomePageFooter from "../components/HomePageFooter";
import NavigationBarWithoutSession from "../components/NavigationBarWithoutSession";
import NavigationBarWithSession from "../components/NavigationBarWithSession";

const PendingListHeader = () => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>PendingList</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                {/* <link rel="stylesheet" type="text/css" media="screen" href="css/style.css" />
                <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css"/> */}
            </Helmet>
        </div>
    )
} 


class PendingListPage extends Component {
    render() {
        return (
            <div>
                <PendingListHeader />

                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}

                <PendingListForm />

                <HomePageFooter />
            </div>
        )
    }
}


export default PendingListPage;