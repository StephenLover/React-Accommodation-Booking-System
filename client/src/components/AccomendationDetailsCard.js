import React, { Component } from 'react';

import AccomendationDetailsSimilarContainer from './AccomenadtionDetailsSimilarContainer';
import AccomendationDetailsBanner from './AccomendationDetailsBanner';
import GoogleMapReact from '../components/GoogleMapReact';

class AccomendationDetailsCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments: "Lovely stay. Really well situated Everything is as described. Two hitches were the lack of privacy from the neighbours walking around outside your bedroom window when it was open for fresh air, and because it was really hot particularly in the afternoon when the sun streamed in we had to have everything wide open.",
            address: "",
            surburb: "",
            postcode: "",
            capacity: "",
            review: "",
            longitude: null,
            latitude: null,
            owner: "",
            pictures: [],
            similarAccList : [],
            availableTime : "",
        }
    }

    componentWillMount(){
        fetch(`/api/accommodation/${this.props.accId}`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                // comments: res.property.comments,
                address: res.property.address,
                suburb: res.property.suburb,
                postcode: res.property.postcode,
                capacity: res.property.capacity,
                review: res.property.review,
                owner : res.property.owner,
                longitude : res.property.longitude,
                latitude :res.property.latitude,
                pictures: res.property.pictures,
                _id: res.property._id,
                availableTime: res.startDate.slice(0,-14) +" to " + res.endDate.slice(0,-14),
            })
        })
        .catch((err) => {console.log(err)})
    }

    testIfNone(){       
        if (this.state.pictures[0] !== undefined){
            return(<AccomendationDetailsBanner pictures={this.state.pictures}/>);
        }      
    }


    render() {
        return (
            <div>
                <div id="contact" className="section">
                    <div className="container">
                        <div className="word_acc_detail">
                            <h1 id="accomondation_name">{this.state.address}</h1> 
                        </div>

                        <div className="row">
                            {/* <!-- Left side of the Body part--> */}
                            <div className="col-md-6">
                                {this.testIfNone()}
                                {/* <AccomendationDetailsBanner pictures={this.state.pictures}/> */}
                                {/* <!-- If there is no session, the comment part will not avalible --> */}
                                {/* <!-- Comment part with session --> */}
                                <div className="comment_title">
                                    <h4>Comments:</h4>
                                </div>
                                
                                <div className="comments">
                                    <p>
                                        {this.state.comments}
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-6">
                    
                                <table className="zebra acc_description">
                                    <tbody>
                                        <tr>
                                            <td width="20%">Address:</td>
                                            <td width="80%" id="address">{this.state.address}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Suburb:</td>
                                            <td width="80%" id="suburb">{this.state.suburb}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Postcode:</td>
                                            <td width="80%" id="postcode">{this.state.postcode}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Capacity:</td>
                                            <td width="80%" id="capacity">{this.state.capacity} persons</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Owner:</td>
                                            <td width="80%" id="owner">{this.state.owner}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Review:</td>
                                            <td width="80%" id="rank">
                                                <div>
                                                    <span id="accomondation_rank">{this.state.review}</span>
                                                    <img src={require("../img/stars.png")} alt='star'/>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="20%">AvailableTime:</td>
                                            <td width="80%" id="owner">{this.state.availableTime}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                    <div className="map">
                                        {/* <GoogleMapReact lat={this.state.latitude} lng={this.state.longitude}/> */}
                                    </div>
                                        <form action="/" method="post" className="add_to_wl">
                                            <div className="add_to_wl_button">
                                                <button type="submit" className="submit">Add to Watching List</button>
                                            </div>
                                        </form>
                                    </div>
                                <AccomendationDetailsSimilarContainer suburb={this.state.suburb}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccomendationDetailsCard;