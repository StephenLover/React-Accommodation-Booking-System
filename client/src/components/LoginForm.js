import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class LoginForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            isAuthenticated: false
        }
        this.handleSignUp = this.handleSignUp.bind(this);
        this.Authentication = this.Authentication.bind(this);
    }


    componentWillMount(){
        if(localStorage.getItem('session-firstName')){
            window.location.href = "/"
        }
    }

    handleSignUp(e){
        e.preventDefault();
        window.location.href="/signup";
    }

    Authentication(e){
        e.preventDefault()
        let auth_bool = false;
        let username = this.refs.username.value;
        this.setState({username : this.refs.username.value, password: this.refs.password.value})

        //fetch data from DB and API
        fetch(`api/user/${username}`)
        .then(res => {
            console.log(res.status)
            // wrong username input, get 404 from backend API
            if(res.status === 404){
                window.alert("Please check the username or password input");
                window.location.href = "/login";
            }
            return res.json()
        })
        .then(json => {
            if(json.password === this.refs.password.value){
                auth_bool = true;
                localStorage.setItem('session-firstName', json.firstName);
                localStorage.setItem('uid',json._id);
                this.setState({isAuthenticated : true});
                alert(`Welcome Back! ${localStorage.getItem('session-firstName')}! Click on 'OK' will move to homepage.`)
                window.location.href = "/"
            }else{
                window.alert("Please check the username or password input");
                window.location.href = "/login"
            }

        })
        .catch((err) => {
            console.log(err);
        })
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
                            <form className="login100-form validate-form "  name="loginform">

                                <div className="wrap-input100 validate-input" data-validate = "Enter username">
                                    <input className="input100" type="text" name="username" placeholder="Username" ref="username" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <input className="input100" type="password" name="password" placeholder="Password" ref="password" required/>
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="container-login100-form-btn" >
                                    <button className="login100-form-btn" type="submit" onClick={this.Authentication}>
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