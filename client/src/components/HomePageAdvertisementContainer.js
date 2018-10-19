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
                property_id={singleProperty.property._id} accId={singleProperty._id}
                startTime={singleProperty.startDate.slice(0,10)}
                endTime={singleProperty.endDate.slice(0, 10)} avgStar={singleProperty.property.avgStar}
                />
            ))
        }
    }


    render() {
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word">
                        <h4>Advertisement :</h4>
                    </div>
                    <div className="row">
                        <div className="recommand">
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