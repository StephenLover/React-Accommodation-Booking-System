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
        }
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.renderUserInfo = this.renderUserInfo.bind(this);
        this.renderHistoryOrAccForm = this.renderHistoryOrAccForm.bind(this);
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

    renderUserInfo(){
        if(this.state.name !== null){
            return(
                <div className="col-md-6 user_profile">
                    <form action="/" method="post">
                        <div className="profile_group">
                            <label className="user_name">Name:</label>
                            <input type="text" className="user_name_input" name="username" value={this.state.name} required/>
                        </div>
                        <div className="profile_group">
                            <label className="user_gender">Gender:</label>
                            <input type="text" className="user_gender_input" name="gender" value={this.state.gender} disabled="disabled"/>
                        </div>
                        <div className="profile_group">
                            <label className="user_email">Email:</label>
                            <input type="text" className="user_email_input" name="email" value={this.state.email} disabled="disabled"/>
                        </div>
                        <div className="profile_group">
                            <label className="user_phone">Phone:</label>
                            <input type="text" className="user_phone_input" name="phone" value={this.state.phone} required/>
                        </div>
                        <div className="profile_submit">
                            <button type="submit" className="add_button">Submit</button>
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
        console.log(this.state)
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
                            <img src={require(`../img/Astrid_1.ico`)} alt="" className="user_profile_img"/>
                            <div className="upload">
                                <input type="button" value="Upload" className="add_button"/>
                            </div>
                            
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