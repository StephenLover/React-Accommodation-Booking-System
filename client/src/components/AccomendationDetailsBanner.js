import React, { Component } from 'react';
import { Fade } from 'react-slideshow-image';
  
const fadeProperties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true
}

// pass-in bugs here
class AccomendationDetailsBanner extends Component {
    constructor(props){
        super(props);
        this.state = {
            pictures : null,
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps)
        this.setState({
            pictures : nextProps.pictures.map(pic => {require(pic)}),
        })
    }

    render(){
        console.log(this.state)
        return (
            <div>
                <Fade {...fadeProperties}>
                    <div className="each_fade_detail">
                        <div className="image_container_detail">
                            <img className= "banner_img_detial" src={this.state.pictures} />
                        </div>
                    </div>

                    <div className="each_fade_detail">
                        <div className="image_container_detail">
                            <img className= "banner_img_detial" src={require('../img/hi.jpg')} />
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
}


// const AccomendationDetailsBanner = (props) => {
//     console.log(props)
//     return (
//         <div>
//             <Fade {...fadeProperties}>
//                 {/* {props.pictures.forEach(path => {
//                     return (
//                         <div className="each_fade_detail">
//                             <div className="image_container_detail">
//                                 <img className= "banner_img_detial" src={require(`../img/bg-01.jpg`)} />
//                             </div>
//                         </div>
//                     )
//                 })} */}


//                 <div className="each_fade_detail">
//                     <div className="image_container_detail">
//                         <img className= "banner_img_detial" src={require(`../img/bg-01.jpg`)} alt={require(`../img/bg-01.jpg`)} />
//                     </div>
//                 </div>

//                 <div className="each_fade_detail">
//                     <div className="image_container_detail">
//                         <img className= "banner_img_detial" src={require(`../img/bg-02.jpg`)} />
//                     </div>
//                 </div>

//                 <div className="each_fade_detail">
//                     <div className="image_container_detail">
//                         <img className= "banner_img_detial" src={require(`../img/bg-03.jpg`)} />
//                     </div>
//                 </div>
//             </Fade>
//         </div>
//     )
// }

export default AccomendationDetailsBanner;