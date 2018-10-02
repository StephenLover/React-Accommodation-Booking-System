import React, { Component } from 'react';


//This is single card component for Similar card in AccomendationDetailsPage 
//Children component for AccomendationDetailsSimilarContainer

class AccomendationCard extends Component{

    constructor(props){
        super(props)
        this.state = {
            status: this.props.property.status,
            _id : this.props.property._id,
            price: this.props.property.price,
            capacity: this.props.property.property.capacity,
            address: this.props.property.property.address,
            suburb: this.props.property.property.suburb,
            picture: this.props.property.property.pictures[0],
            rank : "4.2/5",

            // status: "open",
            // _id : 1,
            // price: "258 per night",
            // capacity: "4",
            // address: "UNSW",
            // suburb: "randwick",
            // picture : "img/bg-01.jpg",
            // rank : "4.2/5"
        }
    }



    render() {
        // console.log(this.props.property)
        const href_acc = '/accommodation/' + this.state._id
        return (
            <div>
                <li>
                    <div className="accomondation">
                        <a href={href_acc}><img src={require(`../${this.state.picture}`)} alt="" className="accomondation_img"/></a>
                        <div className="acc_brief">
                            <span id="accomondation_capacity">Capacity:{this.state.capacity} person,</span>
                            <span id="accomondation_suburb">{this.state.suburb}</span>
                        </div>
                        <div className="acc_name">
                            <a href="#"><span id="accomondation_name">{this.state.address}</span></a>
                        </div>
                        <div className="acc_price">
                            <span id="accomondation_price">${this.state.price} AUD per night</span>
                        </div>
                        <div className="acc_rank">
                            <span id="accomondation_rank">{this.state.rank}</span>
                            <img src={require("../img/stars.png")} alt='star' className="rank_star"/>
                        </div>
                    </div>
                </li>
            </div>
        )
    }
}

export default AccomendationCard;