import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
  
const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true
}
  
const HomePageBanner = () => {
    return (
        <div className="imgbox">
            <Fade {...fadeProperties}>
                <div className="each_fade">
                    <div className="image_container">
                        <img className= "banner_img" src={require(`../img/hp_banner_1.jpg`)} />
                    </div>
                </div>

                <div className="each_fade">
                    <div className="image_container">
                        <img className= "banner_img" src={require(`../img/hp_banner_2.jpg`)} />
                    </div>
                </div>

                <div className="each_fade">
                    <div className="image_container">
                        <img className= "banner_img" src={require(`../img/hp_banner_3.jpg`)} />
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default HomePageBanner;