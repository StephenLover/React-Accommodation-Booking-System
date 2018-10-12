import React, { Component } from 'react';

import UserProfileTravellerForm from '../components/UserProfileTravellerForm';
import UserProfileProviderForm from '../components/UserProfileProviderForm';


class UserProfileForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            profileState: "traveller",
        }
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
    }

    handleSelectorChange(event){
        this.setState({profileState: event.target.value});
    }

    componentWillMount(){
        // todo: need to fetch user's info
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
                            <img src={require(`../img/Astrid_1.ico`)} alt="" className="user_profile_img"/>
                            <div className="upload">
                                <input type="button" value="Upload" className="add_button"/>
                            </div>
                            
                        </div>
                        <div className="col-md-6 user_profile">
                            <form action="/" method="post">
                                <div className="profile_group">
                                    <label className="user_name">Name:</label>
                                    <input type="text" className="user_name_input" name="username" defaultValue="Stephen" required/>
                                </div>
                                <div className="profile_group">
                                    <label className="user_gender">Gender:</label>
                                    <input type="text" className="user_gender_input" name="gender" defaultValue="Male" disabled="disabled"/>
                                </div>
                                <div className="profile_group">
                                    <label className="user_email">Email:</label>
                                    <input type="text" className="user_email_input" name="email" defaultValue="Stephen@gmail.com" disabled="disabled"/>
                                </div>
                                <div className="profile_group">
                                    <label className="user_phone">Phone:</label>
                                    <input type="text" className="user_phone_input" name="phone" defaultValue="0404123123" required/>
                                </div>
                                <div className="profile_submit">
                                    <button type="submit" className="add_button">Submit</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>

                    {/* render different components according to profile state change*/}
                    {this.state.profileState === "traveller" ? <UserProfileTravellerForm/> : <UserProfileProviderForm/>}
                </div>
            </div>
        )
    }
}


export default UserProfileForm