import React, { Component } from 'react';

class NavigationBarWithoutSession extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstName : "",
            keywords: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(props){
        this.setState({
            firstName : localStorage.getItem('session-firstName')
        });
    }

    handleChange(event){
        this.setState({
            keywords: event.target.value
        });
    }

    handleSubmit(event){
        // alert(this.state.keywords);
        event.preventDefault();
        localStorage.setItem('keywords', this.state.keywords);
        window.location.href="http://localhost:3000/search"
    }



    render() {
        return (
            <div>
                <header id="header" className="transparent-nav">
                    <form action="/" method="post" onSubmit={this.handleSubmit}>
                        <div className="navigationbar">
            
                        {/* <!-- Logo --> */}
                            <div className="navbar-brand">
                                <a className="logo" href="/" target="_parent">
                        {/* <!-- Use Logo Image to exchange this part --> */}
                                <img src={require(`../img/unsw.png`)} alt="logo"/>
                        {/* <!-- <h1>LOGO</h1> --> */}
                                </a>
                    
                        </div>
                        {/* <!-- /Logo --> */}
                        {/* <!-- Navigation --> */}
                
                            <nav id="nav">
                                <ul className="main_menu">
                                    <li>
                                        <input type="text" name="search" className="search_se" id="search" placeholder="Input your search keywords here" 
                                        value={this.state.keywords} onChange={this.handleChange}/>
                                    </li>
                                    <li>
                                        <button type="submit" className="search_button_no">Search</button>
                                    </li>
                                        <li><a href="/login">Sign in</a></li>
                                        <li><a href="/signup" target="_parent">Sign Up</a>
                                    </li>
                                </ul>
                             </nav>
                
                        {/* <!-- /Navigation --> */}
                        </div>
                    </form>
	            </header>                
            </div>
        )
    }
}

export default NavigationBarWithoutSession;