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

    componentWillMount(){
        fetch(`api/pending/${localStorage.getItem('uid')}`)
            .then(response => {
                if(response.status === 200){
                    var res = response.json()
                    return res
                }else if(response.status === 404){
                    var res = null
                    return res
                }
            })
            .then(res => {
                console.log(res)
                // this.setState({
                //     capacity: res.pr
                // })
            })
            .catch((err) => {console.log(err)})
    }


    render() {
        return (
            <div id="contact" className="section">
                <div className="container">
                    <div className="word_pending_list">
                        <h1>Your pending transaction</h1> 
                    </div>
                    <div className="row">
                        <form action="/" method="post">
                            <div className="accomondation_pending">
                                <a href="#"><img src={require("../img/hi.jpg")} alt="" className="accomondation_pending_img"/></a>
                                <div className="acc_brief">
                                    <span id="accomondation_capacity">Capacity: ,</span>
                                    <span id="accomondation_suburb">Surburb</span>
                                </div>
                                <div className="acc_name">
                                    <a href="#"><span id="accomondation_name">Name</span></a>
                                </div>
                                <div className="acc_price">
                                    <span id="accomondation_price">Price</span>
                                </div>
                                <div className="acc_rank">
                                    <span id="accomondation_rank">rank</span>
                                    <img src={require("../img/stars.png")} alt='star' className="rank_star"/>
                                </div>
                                <div className="acc_pending_time">
                                    <span id="pending_accomondation_time">Start time ------ End time</span>
                                </div>
                            </div>
                            
                            <div className="button_part">
                                
                                <button type="submit" className="add_button">Pay</button>
                                <button type="submit" className="add_button">Cancel</button>
                                
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
}


export default PendingListForm;