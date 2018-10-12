import React, { Component } from 'react';

class PendingListForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            capacity: null,
            suburb: null,
            address: null,
            price: null,
            startTime: null,
            endTime: null, 
            property_id: null,
            picture: null,
            pendingListLoaded: null,
            ownerEmail: null,
        }
        this.renderIfPendingListIsEmpty = this.renderIfPendingListIsEmpty.bind(this);
        this.renderIfPendingListIsNotEmpty = this.renderIfPendingListIsNotEmpty.bind(this);
    }

    componentWillMount(){
        fetch(`api/pending/${localStorage.getItem('uid')}`)
            .then(response => response.json())
            .then(res => {
                console.log(res)
                if(res.length !== 0){
                    this.setState({
                        capacity : res.accommodationId.property.capacity,
                        address: res.accommodationId.property.address,
                        suburb: res.accommodationId.property.suburb,
                        price: res.accommodationId.price,
                        startTime: res.accommodationId.startDate.slice(0,10),
                        endTime: res.accommodationId.endDate.slice(0,10),
                        property_id: res.accommodationId.property._id,
                        picture: res.accommodationId.property.pictures[0],
                        pendingListLoaded: true,
                        ownerEmail: res.accommodationId.property.owner,
                    })
                }
            })
            .catch((err) => {console.log(err)})
    }

    
    renderIfPendingListIsNotEmpty(){
        return(
                <form action="/" method="post" className="pending_form">
                    <div className="accomondation_pending">
                        <a href="#"><img src={require("../img/hi.jpg")} alt="" className="accomondation_pending_img"/></a>
                        <div className="nopending">
                            <h1>Your Pending List is empty!</h1>
                        </div>

                    </div>
                    
                    <div className="button_part">
                        
                        <button type="submit" className="add_button">Cancel</button>
                        
                    </div>
                </form>
        )
    }

    renderIfPendingListIsEmpty(){
        return(
            <form action="/" method="post" className="pending_form">
                <div className="accomondation_pending">
                    <a href="#"><img src={require(`../${this.state.picture}`)} alt="" className="accomondation_pending_img"/></a>
                    <div className="acc_brief">
                        <span id="accomondation_capacity">{this.state.capacity} persons,</span>
                        <span id="accomondation_suburb">{this.state.suburb}</span>
                    </div>
                    <div className="acc_name">
                        <a href="#"><span id="accomondation_name">{this.state.address}</span></a>
                    </div>
                    <div className="acc_price">
                        <span id="accomondation_price">Price: {this.state.price} AUD</span>
                    </div>
                    <div className="acc_pending_time">
                        <span id="pending_accomondation_time">Pending Time: {this.state.startTime} ------ {this.state.endTime}</span>
                    </div>
                    <div className="acc_owner_detail">
                        <span id="owner_detail">Owner Email: {this.state.ownerEmail}</span>
                    </div>
                </div>
                
                <div className="button_part">
                    
                    <button type="submit" className="add_button">Pay</button>
                    <button type="submit" className="add_button">Cancel</button>
                    
                </div>
            </form>
        )
    }

    render() {
        console.log(this.state)
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word_pending_list">
                        <h1>Your pending transaction</h1> 
                    </div>
                    <div className="row">
                        {this.state.pendingListLoaded === true ? this.renderIfPendingListIsEmpty() : this.renderIfPendingListIsNotEmpty()}
                    </div>

                </div>
            </div>
        )
    }
}


export default PendingListForm;