import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import SignUpForm from '../components/SignUpForm';


const SignUpPageHeader = () => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>Sign Up</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Helmet>
        </div>
    )
} 


class SignUpPage extends Component {
    render() {
        return (
            <div>
                <SignUpPageHeader/>
                <SignUpForm/>
            </div>
        )
    }
}


export default SignUpPage;