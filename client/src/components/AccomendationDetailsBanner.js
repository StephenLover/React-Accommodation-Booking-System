import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
  
const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true
}

class AccomendationDetailsBanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            pictures : this.props.pictures
        }
    }

    componentWillMount(){
        if (typeof(this.props.pictures[0]) === "string"){
            this.setState({
                pictures : this.props.pictures,
            })
        }
    }


    render(){
        return (
            <div>
                <Fade {...fadeProperties}>

                    <div className="each_fade_detail">
                        <div className="image_container_detail">
                            <img className= "banner_img_detail" src={require(`../${this.state.pictures[0]}`)}/>
                        </div>
                    </div>

                    <div className="each_fade_detail">
                        <div className="image_container_detail">
                            <img className= "banner_img_detail"  src={require(`../${this.state.pictures[1]}`)}/>
                        </div>
                    </div>

                    <div className="each_fade_detail">
                        <div className="image_container_detail">
                            <img className= "banner_img_detail"  src={require(`../${this.state.pictures[2]}`)}/>
                        </div>
                    </div>

                    {/* {this.imageDivIterator()} */}
                    
                </Fade>
            </div>
        )
    }
}


export default AccomendationDetailsBanner;