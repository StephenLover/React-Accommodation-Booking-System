import React, { Component } from 'react';

class SignUpForm extends Component{
    render() {
        return (
            <div>
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100" >
                            <span className="login100-form-title" >
                                Sign Up For Free
                            </span>
                            <form className="login100-form validate-form "  name="loginform" action="/" method="POST">

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="username" placeholder="Input Username"/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="password" name="password" placeholder="Input Password"/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="password" name="password_verify" placeholder="Input Password Again"/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="email" placeholder="E-mail Address"/>
                                    <span className="focus-input100"></span>
                                </div>
                                <div className="container-login100-form-btn" >
                                    <button className="login100-form-btn" type="submit">
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