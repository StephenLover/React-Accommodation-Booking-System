import React, { Component } from 'react';


class RequirementPostsForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            suburb : null,
            postcode : null,
            capacity : null,
            startDate: null,
            endDate: null,
            minPrice: null,
            maxPrice: null,
        }
    }


    componentWillMount(){
        // fetch(`/api/property/${localStorage.getItem('uid')}`)
        // .then(response => response.json())
        // .then(res => {
        //     this.setState({
        //         propertyList : res
        //     })
        // })
        // .catch((err) => {console.log(err)})
    }

    // renderIfPropertyListNotEmpty(){
    //     if(this.state.propertyList !== null){
    //         return (
                    
    //             ))
    //         )
    //     }
    // }

    render() {
        return (
            <tr>
                <td width="20%">Kensington</td>
                <td width="10%">2033</td>
                <td width="10%">3</td>
                <td width="20%">2018-12-12</td>
                <td width="20%">2018-12-22</td>
                <td width="10%">$100</td>
                <td width="10%">$200</td>
            </tr>
        )
    }
}

export default RequirementPostsForm;