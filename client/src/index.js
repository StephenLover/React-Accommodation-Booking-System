import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route , Switch } from 'react-router-dom'

//import routers
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage'
// import NotFound from './Pages/notFound';    //TODO : 404 bug need to fix


//routers controller
const AppRouter = () => 
    <BrowserRouter>
        <Switch>
            <Route exact path = '/' component = {HomePage} />
            <Route exact path = "/login" component={LoginPage} />
            <Route exact path = "/signup" component={SignUpPage} />
            {/* <Route component= {NotFound} /> */}
        </Switch>
    </BrowserRouter>


ReactDOM.render(
    <AppRouter />, document.getElementById('root')
)

registerServiceWorker();
