import React, { Component } from 'react';
import ProviderReleaseOwnPropertySingleInfo from './ProviderReleaseOwnPropertySingleInfo';
import ProviderReleaseOwnPropertySingleForm from './ProviderReleaseOwnPropertySingleForm'


class ProviderReleaseOwnPropertySingleContainer extends Component{
    render() {
        return (
            <div>
                <ProviderReleaseOwnPropertySingleInfo/>
                <ProviderReleaseOwnPropertySingleForm/>
            </div>
        )
    }
}

export default ProviderReleaseOwnPropertySingleContainer;