import React, { Component } from 'react';
import HomePageAdvertisementSinglecard from '../components/HomePageAdvertisementSingleCard';


class HomePageAdvertisementContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            adAccList: null,
        }
        this.renderIfDataPreapared = this.renderIfDataPreapared.bind(this);
    }

    componentWillMount(){
        fetch(`/api/search/ad`)
        .then(response => response.json())
        .then(res => {
            this.setState({
                adAccList : res,
            })
        })
        .catch((err) => {console.log(err)})
    }

    renderIfDataPreapared(){
        if(this.state.adAccList !== null){
            return this.state.adAccList.map((singleProperty,index) => (
                <HomePageAdvertisementSinglecard key={index} capacity={singleProperty.property.capacity}
                suburb={singleProperty.property.suburb} address={singleProperty.property.address}
                price={singleProperty.price} pictures={singleProperty.property.pictures}
                />
            ))
        }
    }


    render() {
        console.log(this.state.adAccList)
        return (
            <div id="contact" class="section">
                <div class="container">
                    <div class="word">
                        <h1>Advertisement :</h1>
                    </div>
                    <div class="row">
                        <div class="recommand">
                            <ul>
                                {this.renderIfDataPreapared()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePageAdvertisementContainer;