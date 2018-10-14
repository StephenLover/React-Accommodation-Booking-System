import React, { Component } from 'react';

class ProviderReleaseOwnPropertySingleForm extends Component{





    render() {
        return (
            
                // {/* <tr id="addlist" style={{display:"none"}}> */}
                <tr id="addlist" >
                    <td width="25%">
                        <span>Start Time:</span>
                        <input type="text" placeholder="YYYY-MM-DD"/>
                    </td>
                    <td width="25%">
                        <span>End Time:</span>
                        <input type="text" placeholder="YYYY-MM-DD"/>
                    </td>
                    <td width="25%">
                        <span>Price: $</span>
                        <input type="text" placeholder="Whole Numbers"/>
                    </td>
                    <td width="25%">
                        <button type="submit" className="submit_button">Submit</button>
                    </td>
                </tr>
        )
    }
}

export default ProviderReleaseOwnPropertySingleForm;