import React, { Component } from 'react';


class SignUpForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            emailAddress: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordAgain: "",
            phoneNumber: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        for (let el in this.state){
            console.log(el,this.state[el]);
        }
        this.setState({
            emailAddress : this.refs.emailAddress.value,
            firstName : this.refs.firstName.value,
            lastName : this.refs.lastName.value,
            password : this.refs.password.value,
            passwordAgain : this.refs.passwordAgain.value,
            phoneNumber : this.refs.phoneNumber.value,
        })
        console.log(this.state);
    }


    render() {
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100" >
                            <span className="login100-form-title" >
                                Sign Up For Free
                            </span>
                            <form className="login100-form validate-form "  name="loginform">

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="username" placeholder="Email address" ref="emailAddress" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="password" placeholder="FirstName" ref="firstName" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="password_verify" placeholder="LastName" ref="lastName" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="password" name="email" placeholder="Password" ref="password" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="password" name="email" placeholder="Password Again" ref="passwordAgain" required/>
                                    <span className="focus-input100"></span>
                                </div>
            
                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="email" placeholder="Phone Number" ref="phoneNumber" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="container-login100-form-btn" >
                                    <button className="login100-form-btn" type="submit" onClick={this.handleSubmit}>
                                        Submit
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


export default SignUpForm;