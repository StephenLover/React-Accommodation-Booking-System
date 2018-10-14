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
        }
    }

    render() {
        console.log(this.state)
        return (
            <li>
                <div class="accomondation">
                    <a href="#"><img src={require(`../${this.state.pictures[1]}`)} alt="" class="accomondation_img"/></a>
                    <div class="acc_brief">
                        <span id="accomondation_capacity">Capacity: ,</span>
                        <span id="accomondation_suburb">Surburb</span>
                    </div>
                    <div class="acc_name">
                        <a href="#"><span id="accomondation_name">Name</span></a>
                    </div>
                    <div class="acc_price">
                        <span id="accomondation_price">Price</span>
                    </div>
                    <div className="acc_rank">
                        <span id="accomondation_rank">rank</span>
                        <img src={require(`../img/stars.png`)} alt='star' classs="rank_star"/>
                    </div>
                </div>
            </li>
        )
    }
}

export default HomePageAdvertisementSingleCard;