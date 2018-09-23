import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class LoginForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleSignUp(e){
        e.preventDefault();
        window.location.href="/signup";
    }

    render() {
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100" >
                            <span className="login100-form-title" >
                                Accomondation System
                            </span>
                            <form className="login100-form validate-form "  name="loginform" action="/" method="POST">

                                <div className="wrap-input100 validate-input" data-validate = "Enter username">
                                    <input className="input100" type="text" name="username" placeholder="User name"/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input className="input100" type="password" name="password" placeholder="Password"/>
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="container-login100-form-btn" >
                                    <button className="login100-form-btn" type="submit">
                                        Login
                                    </button>
                                    <button className="login100-form-btn" type="submit" onClick={this.handleSignUp}>
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginForm;