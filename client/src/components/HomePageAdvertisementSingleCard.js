import React, { Component } from 'react';

class HomePageAdvertisementSingleCard extends Component{
    constructor(props){
        super(props)
        this.state = {
            capacity: this.props.capacity,
            suburb: this.props.suburb,
            address: this.props.address,
            price: this.props.price,
            rank: this.props.rank,
            pictures: this.props.pictures,
            property_id : this.props.proerty_id,
            accId: this.props.accId,
            startTime: this.props.startTime,
            endTime : this.props.endTime
        }
    }

    render() {
        console.log(this.state)
        const href_acc = '/accommodation/' + this.state.property_id
        return (
            <li>
                <div className="similar_card">
                    <div className="accomondation">
                        <a href={href_acc}><img src={require(`../${this.state.pictures[0]}`)} alt="" className="accomondation_img"/></a>
                        <div className="acc_brief">
                            <span id="accomondation_capacity">{this.state.capacity > 1 ? this.state.capacity + " persons" : "1 person"},</span>
                            <span id="accomondation_suburb">{this.state.suburb}</span>
                        </div>
                        <div className="acc_name">
                            <a href={href_acc}><span id="accomondation_name">{this.state.address}</span></a>
                        </div>
                        <div className="acc_price">
                            <span id="accomondation_price">Price: ${this.state.price} per night</span>
                        </div>
                        <div className="acc_time">
                            <span id="accomondation_time">Spare: {this.state.startTime} to {this.state.endTime}</span>
                        </div>
                        <div className="acc_rank">
                            <span id="accomondation_rank">Rating: {this.state.rank}</span>
                            <img src={require("../img/stars.png")} alt='star' className="rank_star"/>  
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default HomePageAdvertisementSingleCard;