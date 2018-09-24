import React, { Component } from 'react';

class Banner extends Component{
    render() {
        return (
            <div>
                <div className="imgbox">
                    <ul id="bannerimg">
                        <li>Advertise 1</li>
                        <li>Advertise 2</li>
                        <li>Advertise 3</li>
                        <li>Advertise 4</li>
                    </ul>
                    <div className="clearfix"></div>
                    <div className="imgnum">
                        <span className="default">1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Banner;