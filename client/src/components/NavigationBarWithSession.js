import React, { Component } from 'react';

class NavigationBarWithSession extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectorState: "Traveller",
            firstName : "",
            keywords: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectorChange = this.handleSelectorChange.bind(this);
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
        if(this.state.selectorState === "Traveller"){
            localStorage.setItem('keywords', this.state.keywords);
            window.location.href="http://localhost:3000/search"
        }else if(this.state.selectorState === "Provider"){
            localStorage.setItem('keywords', this.state.keywords);
            window.location.href="http://localhost:3000/requirements"
        }
    }

    handleSelectorChange(event){
        this.setState({
            selectorState: event.target.value
        });
    }


    render() {
        console.log(this.state)
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
                                <div className="change">
                                    <select name="change_user" className="change_user" value={this.state.selectorState} onChange={this.handleSelectorChange}>
                                        <option value="Traveller">Traveller</option>
                                        <option value="Provider">Provider</option>
                                    </select>
                                </div>
                            </div>
                        {/* <!-- /Logo --> */}
                    {/* <!-- Navigation --> */}
                        
                        <nav id="nav">
                            <ul className="main_menu">
                                <li>
                                    <input type="text" name="search" className="search_se" id="search" placeholder="Input your search keywords or postcode" 
                                    value={this.state.keywords} onChange={this.handleChange}/>
                                </li>
                                <li>
                                    <button type="submit" className="search_button_se" >Search</button>
                                </li>
                                <li><img src={require(`../img/Astrid_2.ico`)} className="user_img"/></li>
                                <li className="dropdown"><a href="#" id="Username">{this.state.firstName}</a>
                                <ul className="dropdown_content">
                                    <li><a href="/profile" target="_parent">Personal Profile</a></li>
                                    <li><a href="/watching" target="_parent">Watching List</a></li>
                                    <li><a href="/pendinglist" target="_parent">Pending List</a></li>
                                    <li><a href="/" onClick={() => {localStorage.clear()}} target="_parent">Logout</a></li>
                                </ul> 
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

export default NavigationBarWithSession;