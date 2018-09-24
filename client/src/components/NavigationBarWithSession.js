import React, { Component } from 'react';


class NavigationBarWithSession extends Component{
    render() {
        return (
            <div>
                <header id="header" className="transparent-nav">
                    <form action="/" method="post">
                        <div className="navigationbar">
            
                        {/* <!-- Logo --> */}
                            <div className="navbar-brand">
                                <a className="logo" href="index.html" target="_parent">
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
                                    <input type="text" name="search" className="search_se" id="search" placeholder="Please input Keywords"/>
                                </li>
                                <li>
                                    <button type="submit" className="search_button_se">Search</button>
                                </li>
                                <li><img src={require(`../img/Astrid.ico`)} className="user_img"/></li>
                                <li className="dropdown"><a href="#" id="Username">Username</a>
                                <ul className="dropdown_content">
                                    <li><a href="Profile.html" target="_parent">Personal Profile</a></li>
                                    <li><a href="WatchingList.html" target="_parent">Watching List</a></li>
                                    <li><a href="PendingList.html" target="_parent">Pending List</a></li>
                                    <li><a href="index.html" target="_parent">Logout</a></li>
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