import React, { Component } from 'react';

class TravellerReleaseInformationForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            suburb: "",
            postcode: "",
            capacity: null,
            startTime: "",
            endTime: "",
        }
    }

    render() {
        return (
            <div id="contact" className="section">
                <div className="container">

                {/* <!-- The Words are belong to Traveller --> */}
                <div className="word_release_information">
                    <h1>Accomondation Needed Release Information</h1> 
                </div>
    
                <div className="row">
                {/* <!-- Below are release information for traveller --> */}
                    <div className="release_requirements">
                        <form action="/" method="post" className="requirements_input_form">
                            <div className="input_group">
                                <label className="requirements_surburb">Surburb:</label>
                                <input type="text" className="requirements_surburb_input" name="surburb" required/>
                            </div>
                            <div className="input_group">
                                <label className="requirements_postcode">Postcode:</label>
                                <input type="text" className="requirements_postcode_input" name="postcode" required/>
                            </div>
                            <div className="input_group">
                                <label className="requirements_capacity">Capacity:</label>
                                <select name="capacity" className="requirements_capacity_button">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                </select>
                            </div>
                            <div className="input_group">
                                <label className="requirements_start_time">Start Time:</label>
                                <input type="text" className="requirements_start_time_input" name="starttime" placeholder="YYYY-MM-DD" required/>
                            </div>
                            <div className="input_group">
                                <label className="requirements_end_time">End Time:</label>
                                <input type="text" className="requirements_end_time_input" name="endtime" placeholder="YYYY-MM-DD" required/>
                            </div>
                            <div className="property_submit">
                                <button type="submit" className="add_button">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default TravellerReleaseInformationForm;