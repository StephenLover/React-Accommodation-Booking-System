import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route , Switch } from 'react-router-dom'

//import routers
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage'
import AccommodationDetailsPage from './pages/AccommodationDetailsPage';
import SearchResultPage from './pages/SearchResult';
import WatchingListPage from './pages/WatchingListPage';
import PendingListPage from './pages/PendingListPage';
import UserProfilePage from './pages/UserProfilePage';
import ProviderReleasePropertyPage from './pages/ProviderReleasePropertyPage';
import TravellerReleaseRentalInfoPage from './pages/TravellerReleaseRentalInfoPage';
import RequirementsPage from './pages/RequirementsPage';
// import NotFound from './Pages/notFound';    //TODO : 404 bug need to fix

import '../src/css/style.css';
import '../src/css/bootstrap.min.css';


//routers controller
const AppRouter = () => 
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {HomePage} />
            <Route exact path = "/login" component={LoginPage} />
            <Route exact path = "/signup" component={SignUpPage} />
            <Route exact path = "/accommodation/:id" component={AccommodationDetailsPage}/>
            <Route exact path = "/search" component={SearchResultPage} />
            <Route exact path = "/requirements" component={RequirementsPage} />
            <Route exact path = "/watching" component={WatchingListPage} />
            <Route exact path = "/pendinglist" component={PendingListPage} />
            <Route exact path = "/profile" component={UserProfilePage} />
            <Route exact path = "/release/provider" component={ProviderReleasePropertyPage} />
            <Route exact path = "/release/traveller" component={TravellerReleaseRentalInfoPage} />
            {/* <Route component= {NotFound} /> */}
        </Switch>
    </BrowserRouter>


ReactDOM.render(
    <AppRouter />, document.getElementById('root')
)

registerServiceWorker();
