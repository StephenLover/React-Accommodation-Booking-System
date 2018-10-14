import React, { Component } from 'react';
import ProviderReleaseOwnPropertySingleInfo from './ProviderReleaseOwnPropertySingleInfo';
import ProviderReleaseOwnPropertySingleForm from './ProviderReleaseOwnPropertySingleForm'


class ProviderReleaseOwnPropertySingleContainer extends Component{
    render() {
        return (
            <tbody>
                <ProviderReleaseOwnPropertySingleInfo/>
                <ProviderReleaseOwnPropertySingleForm/>
            </tbody>
        )
    }
}

export default ProviderReleaseOwnPropertySingleContainer;