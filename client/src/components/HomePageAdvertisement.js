import React, { Component } from 'react';

class HomePageAdvertisement extends Component{
    render() {
        return (
            <div id="contact" class="section">
                <div class="container">
                    <div class="word">
                        <h1>Advertisement :</h1>
                    </div>
                    <div class="row">
                        <div class="recommand">
                            <ul>
                                <li>
                                    <div class="accomondation">
                                        <a href="#"><img src={require(`../img/bg-01.jpg`)} alt="" class="accomondation_img"/></a>
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
                                <li>
                                    <div class="accomondation">
                                        <a href="#"><img src={require(`../img/bg-01.jpg`)}  alt="" class="accomondation_img"/></a>
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
                                <li>
                                    <div class="accomondation">
                                        <a href="#"><img src={require(`../img/bg-01.jpg`)}  alt="" class="accomondation_img"/></a>
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
                                            <img src={require(`../img/stars.png`)}  alt='star' classs="rank_star"/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePageAdvertisement;