import React, { Component } from 'react';

class HomePageFooter extends Component{
    render() {
        return (
            <div>
                <footer className="footer">
                <div className="footer_content">
                    <ul>
                        <li>
                            <div className="footer_single">
                                <div className="footer_title">
                                    <h3>About Us</h3>
                                </div>
                                <div className="footer_text">
                                    <p>The Double 90 Group is an extremely mystical team, there are four wacko in this team, you may can find them at CSE Drums lab in 2pm on Tuesday....</p>
                                    <p>Developers: <br/>Albus Lee, Bruce Wang, Jaffar Ye, Stephen Wang</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="footer_single">
                                <div className="footer_title">
                                    <h3>Get in Touch</h3>
                                </div>
                                <div className="footer_text">
                                    <h4>Location :</h4>
                                    <p>UNSW Business School G21</p>
                                </div>
                                <div className="footer_text">
                                    <h4>Contact :</h4>
                                    <p>Phone : +04?? ??? ???</p>
                                    <p>Email : weido@gmail.com</p>
                                </div>  
                            </div>
                        </li>
                        <li>
                            <div className="footer_single">
                                <div className="footer_title">
                                    <h3>Quick Links</h3>
                                </div>
                                <div className="footer_text">
                                    <p><a href="/">Home</a></p>
                                    <p><a href="#">Back To Top</a></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="copywrite">
                    <p>Copyright &copy; 2018 Double 90 All rights reserved.</p>
                </div>
            </footer>
            </div>
        )
    }
}

export default HomePageFooter;