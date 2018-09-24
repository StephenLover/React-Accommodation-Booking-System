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
                                    <p>Curabitur non nulla sit amet nislinit tempus convallis quis ac lectus. lac inia eget consectetur sed, convallis at tellus. Nulla porttitor accumsana tincidunt.</p>
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
                                    <p>0926k 4th block building, king Avenue, New York City.</p>
                                </div>
                                <div className="footer_text">
                                    <h4>Contact :</h4>
                                    <p>Phone : +121 098 8907 9987</p>
                                    <p>Email : info@example.com</p>
                                </div>  
                            </div>
                        </li>
                        <li>
                            <div className="footer_single">
                                <div className="footer_title">
                                    <h3>Quick Links</h3>
                                </div>
                                <div className="footer_text">
                                    <p><a href="index.html">Home</a></p>
                                    <p><a href="#">Back To Top</a></p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="copywrite">
                    <p>Copyright &copy; 2018.Company name All rights reserved.</p>
                </div>
            </footer>
            </div>
        )
    }
}

export default HomePageFooter;