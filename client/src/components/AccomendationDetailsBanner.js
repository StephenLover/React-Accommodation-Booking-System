import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
  
const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true
}
  
const AccomendationDetailsBanner = () => {
    return (
        <div className>
            <Fade {...fadeProperties}>
                <div className="each_fade">
                    <div className="image_container">
                        <img className= "banner_img" src={require(`../img/bg-01.jpg`)} />
                    </div>
                </div>

                <div className="each_fade">
                    <div className="image_container">
                        <img className= "banner_img" src={require(`../img/bg-02.jpg`)} />
                    </div>
                </div>

                <div className="each_fade">
                    <div className="image_container">
                        <img className= "banner_img" src={require(`../img/bg-03.jpg`)} />
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default AccomendationDetailsBanner;