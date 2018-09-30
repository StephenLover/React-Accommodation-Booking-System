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
            pictures : ['../img/bg-01.jpg', '../img/bg-02.jpg' , '../img/bg-03.jpg'],
        }
    }

    componentDidMount(){
        this.setState({
            pictures : this.props.pictures,
        })
    }

    render(){
        console.log(this.props)
        return (
            <div>
                <Fade {...fadeProperties}>
                    <div className="each_fade_detail">
                        <div className="image_container_detail">
                            <img className= "banner_img_detial" src={require(`${this.state.pictures[0]}`)} alt={require(`../img/bg-01.jpg`)} />
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