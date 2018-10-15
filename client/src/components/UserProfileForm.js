import React, { Component } from 'react';

import UserProfileTravellerForm from '../components/UserProfileTravellerForm';
import UserProfileProviderForm from '../components/UserProfileProviderForm';


class UserProfileForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            profileState: "traveller",
            name: null,
            gender: null,
            email: null,
            phone: null,
            firstName: null,
            lastName: null,
            // reviewFormStatus: false,
            // reviewItem: null,
        }
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.renderUserInfo = this.renderUserInfo.bind(this);
        this.renderHistoryOrAccForm = this.renderHistoryOrAccForm.bind(this);
        this.handleUserInfoFormSubmit = this.handleUserInfoFormSubmit.bind(this);
    }

    handleSelectorChange(event){
        this.setState({profileState: event.target.value});
    }

    componentWillMount(){
        // todo: need to fetch user's info
        fetch(`/api/user/${localStorage.getItem('uid')}`)
            .then(response => response.json())
            .then(res => {
                this.setState({
                    // comments: res.property.comments,
                    name: res.firstName + ' ' + res.lastName,
                    gender: res.gender,
                    email: res._id,
                    phone: res.phone
                })
            })
            .catch((err) => {console.log(err)})
    }

    handleUserInfoFormSubmit(e){
        e.preventDefault();
        let data = {
					'_id': localStorage.getItem('uid'),
					'firstName': this.state.firstName,
					'lastName': this.state.lastName,
					'phone': this.state.phone
        }
        fetch('/api/user/update', {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }})
				.then(res => res.json)
				.then(response => {
                    localStorage.setItem('session-firstName', this.state.firstName);
                    alert('User Profile Updated');
                    window.location.href="/profile"
                })
				.catch(error => console.error('Error:', error));

    }

    handleUserInfoChange(e){
        let name = this.refs.name.value
        let phone = this.refs.phone.value;
        let email = localStorage.getItem('uid')
        let firstName = name.split(' ')[0]
        let lastName = name.split(' ')[1]
        this.setState({
            firstName: firstName,
            lastName: lastName,
            phone: phone
        })
    }

    renderUserInfo(){
        if(this.state.name !== null){
            return(
                <div className="col-md-6 user_profile">
                    <form action="/" method="post">
                        <div className="profile_group">
                            <label className="user_name">Name:</label>
                            <input type="text" className="user_name_input" name="username" ref="name" defaultValue={this.state.name} onChange={this.handleUserInfoChange.bind(this)} required/>
                        </div>
                        <div className="profile_group">
                            <label className="user_gender">Gender:</label>
                            <input type="text" className="user_gender_input" name="gender" defaultValue={this.state.gender} disabled="disabled"/>
                        </div>
                        <div className="profile_group">
                            <label className="user_email">Email:</label>
                            <input type="text" className="user_email_input" name="email" defaultValue={this.state.email} disabled="disabled"/>
                        </div>
                        <div className="profile_group">
                            <label className="user_phone">Phone:</label>
                            <input type="text" className="user_phone_input" name="phone" ref='phone' defaultValue={this.state.phone} onChange={this.handleUserInfoChange.bind(this)} required/>
                        </div>
                        <div className="profile_submit">
                            <button type="submit" className="add_button" onClick={this.handleUserInfoFormSubmit}>Submit</button>
                        </div>
                        
                    </form>
                </div>
            )
        }
    }

    renderHistoryOrAccForm(){
        if(this.state.name !== null){
            return(
                <div>
                    {this.state.profileState === "traveller" ? <UserProfileTravellerForm/> : <UserProfileProviderForm />}
                </div>
            )
        }
    }

    render () {
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word_personal_profile">
                        <h1>Personal Profile</h1> 
                    </div>
                    <div className="swap">
                        <form action="/" method="post">
                            <span>Profile For :</span>
                            <select name="user_swap" className="swap_button" value={this.state.profileState} onChange={this.handleSelectorChange}>
                                <option value="traveller">Traveller</option>
                                <option value="provider">Provider</option>
                            </select>
                        </form>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={require(`../img/Astrid_2.ico`)} alt="" className="user_profile_img"/>
                           
                            
                        </div>
                        {this.renderUserInfo()}
                    </div>

                    {/* render different components according to profile state change*/}
                    {this.renderHistoryOrAccForm()}
                </div>
            </div>
        )
    }
}


export default UserProfileForm