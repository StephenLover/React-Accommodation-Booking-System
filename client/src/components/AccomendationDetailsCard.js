import React, { Component } from 'react';

import AccomendationDetailsSimilarContainer from './AccomenadtionDetailsSimilarContainer';
import AccomendationDetailsBanner from './AccomendationDetailsBanner';
import GoogleMapReact from '../components/GoogleMapReact';
import AccomendationDetailsReviewForm from '../components/AccomendationDetailsReviewForm'

class AccomendationDetailsCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            comments: "Lovely stay. Really well situated Everything is as described. Two hitches were the lack of privacy from the neighbours walking around outside your bedroom window when it was open for fresh air, and because it was really hot particularly in the afternoon when the sun streamed in we had to have everything wide open.",
            address: "",
            postcode: "",
            capacity: "",
            review: null,
            longitude: null,
            latitude: null,
            owner: "",
            pictures: [],
            similarAccList : [],
            availableTime : "",
            accId: "",
            property_id: "",
            reviewList: null,
            startTime: null,
            endTime: null,
        }
        this.addToWatchingList = this.addToWatchingList.bind(this);
        this.googleComponentRender = this.googleComponentRender.bind(this);
    }

    componentWillMount(){
        fetch(`/api/accommodation/${this.props.propertyId}`)
        .then(response => response.json())
        .then(res => {
            console.log(res)
            console.log('propsid',this.props.propertyId)
            // console.log(res[0].accommodationId.startDate.slice(0,-14),res[0].accommodationId.endDate.slice(0,-14))
            this.setState({
                // comments: res.property.comments,
                address: res[0].accommodationId.property.address,
                suburb: res[0].accommodationId.property.suburb,
                postcode: res[0].accommodationId.property.postcode,
                capacity: res[0].accommodationId.property.capacity,
                review: res[0].accommodationId.property.review,
                owner : res[0].accommodationId.property.owner,
                longitude : res[0].accommodationId.property.longitude,
                latitude :res[0].accommodationId.property.latitude,
                pictures: res[0].accommodationId.property.pictures,
                // startTime: res[0].accommodationId.startDate.slice(0,-14),
                // endTime: res[0].accommodationId.endDate.slice(0,-14),
                accId : this.props.accId,
                //property_id : this.props.accId,
                reviewList : res,
            })
        })
        .catch((err) => {console.log(err)})

        fetch(`/api/acc/${this.props.accId}`)
        .then(res => res.json())
        .then(res => {
            console.log('ressss', res)
            this.setState({
                startTime: res.startDate.slice(0,-14),
                endTime: res.endDate.slice(0,-14),
            })
        })
        .catch((err) => {console.log(err)})
    }

    testIfNone(){       
        if (this.state.pictures[0] !== undefined){
            return(<AccomendationDetailsBanner pictures={this.state.pictures}/>);
        }      
    }

    addToWatchingList(e){
        e.preventDefault();

        if(localStorage.getItem('uid') === null){
            alert('Please Login in First!');
            window.location.href="/login"
        }else{
            let url = '/api/add2watching';
            let data = {_id: localStorage.getItem('uid'), accId: this.state.accId};
            console.log(JSON.stringify(data))
            fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => alert('The property has been added to watching list!'))
            .catch(error => console.error('Error:', error));
        }
    }

    googleComponentRender(){
        console.log(this.state)
        if (this.state.latitude !== undefined && this.state.longitude !== undefined){
            console.log("1")
            return(<GoogleMapReact lat={this.state.latitude} lng={this.state.longitude}/>)
        }
        else if (this.state.latitude === undefined && this.state.longitude === undefined){
            console.log("2")
            let latitude = -33.9173;
            let longitude = 151.2313;
            console.log(typeof(latitude))
            return(<GoogleMapReact lat={latitude} lng={longitude}/>)
        }
    }

    reviewListRender(){
        if(this.state.reviewList !== null){
            let filteredReviewedList = this.state.reviewList.filter(singleReview => singleReview.review !== null)
            return (<AccomendationDetailsReviewForm reviewList={filteredReviewedList}/>)
        }
    }

    render() {
        console.log(this.state)
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
                                    <h4>Description:</h4>
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
                                            <td width="80%" id="capacity">{this.state.capacity > 1 ? this.state.capacity + " persons" : "1 person"}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Owner:</td>
                                            <td width="80%" id="owner">{this.state.owner}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">Start Date</td>
                                            <td width="80%" id="rank">{this.state.startTime}</td>
                                        </tr>
                                        <tr>
                                            <td width="20%">End Date:</td>
                                            <td width="80%" id="owner">{this.state.endTime}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                    <div className="map">
                                        {this.googleComponentRender()}
                                    </div>
                                        <form action="/" method="post" className="add_to_wl">
                                            <div className="add_to_wl_button">
                                                <button type="submit" className="submit" onClick={this.addToWatchingList}>Add to Watching List</button>
                                            </div>
                                        </form>
                                    </div>

                                {this.reviewListRender()}
                                <AccomendationDetailsSimilarContainer suburb={this.state.suburb}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccomendationDetailsCard;