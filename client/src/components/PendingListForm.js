import React, { Component } from 'react';

class PendingListForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            capacity: "",
            surburb: "",
            name: "",
            price: "",
            rank : "",
            startTime: "",
            endTime: "",
            
        }
    }

    render() {
        return (
            <div id="contact" class="section">
                <div class="container">
                    <div class="word_pending_list">
                        <h1>Your pending transaction</h1> 
                    </div>
                    <div class="row">
                        <form action="/" method="post">
                            <div class="accomondation_pending">
                                <a href="#"><img src={require("../img/hi.jpg")} alt="" class="accomondation_pending_img"/></a>
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
                                <div class="acc_rank">
                                    <span id="accomondation_rank">rank</span>
                                    <img src={require("../img/stars.png")} alt='star' class="rank_star"/>
                                </div>
                                <div class="acc_pending_time">
                                    <span id="pending_accomondation_time">Start time ------ End time</span>
                                </div>
                            </div>
                            
                            <div class="button_part">
                                
                                <button type="submit" class="add_button">Pay</button>
                                <button type="submit" class="add_button">Cancel</button>
                                
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}


export default PendingListForm;