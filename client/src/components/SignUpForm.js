import React, { Component } from 'react';

//TODO: Type check in the input
//TODO: Malicious Injection Prevent and Escape

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
        this.validForm = this.validForm.bind(this);
        this.postRequest = this.postRequest.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({
            emailAddress : this.refs.emailAddress.value,
            firstName : this.refs.firstName.value,
            lastName : this.refs.lastName.value,
            password : this.refs.password.value,
            passwordAgain : this.refs.passwordAgain.value,
            phoneNumber : this.refs.phoneNumber.value,
        })
        console.log(this.validForm());
        if (this.validForm() === false){
            alert("Please fill all input!");
            window.location.href="/signup";
        }else{
            console.log(this.refs.password.value,this.refs.passwordAgain.value)
            if(this.refs.password.value !== this.refs.passwordAgain.value){
                alert("Please check your password input")

                window.location.href="/signup";
            }else{
                this.postRequest()
            }
        }

    }

    postRequest(){
        let data = {
            _id: this.refs.emailAddress.value,
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            password: this.refs.password.value,
            phoneNumber: this.refs.phoneNumber.value,
            gender: this.refs.gender.value,
        }
        console.log(data)
        let url = `http://127.0.0.1:5000/api/signup`
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.status)
            console.log(res.json());
            if(res.status === 200){
                res.json();
                console.log('Success:', JSON.stringify(res.json));
                alert(`Registered successfully! Click 'OK' and login it again`)
                window.location.href="./login"
            }
        })
        .catch(error => {
            alert(`Registered Failed, please try again.`)
            console.error('Error:', error)
        });
    }

    validForm() {
        let valid_bool = false
        let emailAddress = this.refs.emailAddress.value;
        let firstName = this.refs.emailAddress.value
        let lastName = this.refs.emailAddress.value
        let password = this.refs.emailAddress.value
        let passwordAgain = this.refs.emailAddress.value
        let phoneNumber = this.refs.emailAddress.value
        let gender = this.refs.gender.value
        //check if all the fields has been input
        if (emailAddress.length !== 0 && firstName.length !== 0 && lastName.length !== 0 
        && password.length !== 0 && password.length !== 0 && passwordAgain.length !== 0 && phoneNumber.length !== 0
        && gender !== 0){
            valid_bool = true;
            return valid_bool
        }
        return valid_bool
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
                                    <input className="input100" type="password" name="password" placeholder="Password" ref="password" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="password" name="password again" placeholder="Password Again" ref="passwordAgain" required/>
                                    <span className="focus-input100"></span>
                                </div>
            
                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="gender" placeholder="Gender" ref="gender" required/>
                                    <span className="focus-input100"></span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" name="phone number" placeholder="Phone Number" ref="phoneNumber" required/>
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