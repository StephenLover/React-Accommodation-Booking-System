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
                <div className="each_fade_detail">
                    <div className="image_container_detail">
                        <img className= "banner_img_detial" src={require(`../img/bg-01.jpg`)} />
                    </div>
                </div>

                <div className="each_fade_detail">
                    <div className="image_container_detail">
                        <img className= "banner_img_detial" src={require(`../img/bg-02.jpg`)} />
                    </div>
                </div>

                <div className="each_fade_detail">
                    <div className="image_container_detail">
                        <img className= "banner_img_detial" src={require(`../img/bg-03.jpg`)} />
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default AccomendationDetailsBanner;