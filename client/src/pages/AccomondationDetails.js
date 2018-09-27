import React, { Component } from 'react';

import { Helmet } from "react-helmet";
import NavigationBarWithoutSession from '../components/NavigationBarWithoutSession';
import NavigationBarWithSession from '../components/NavigationBarWithSession';
import AccomendationDetailsCard from '../components/AccomendationDetailsCard'

const AccomendationDetailsHeader = () => {
    return (
        <div>
            <Helmet>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                <title>Accomondation Details</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                {/* <link rel="stylesheet" type="css" media="screen" href="../css/style.css" />
                <link type="css" rel="stylesheet" href="css/bootstrap.min.css"/>  */}
            </Helmet>
        </div>
    )
}

const AccomendationDetailsFooter = () => {
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


class AccomendationDetails extends Component{
    constructor(props){
        super(props)
        this.setState = {

        }
    }
    
    render() {
        return (
            <div>
                <AccomendationDetailsHeader/>

                {localStorage.getItem('session-firstName') === null ? <NavigationBarWithoutSession/> : <NavigationBarWithSession/>}

                <AccomendationDetailsCard/>

                <AccomendationDetailsFooter/>
            </div>
        )
    }
}

export default AccomendationDetails;