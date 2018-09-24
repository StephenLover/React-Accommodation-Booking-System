import React, { Component } from 'react';

class NavigationBarWithoutSession extends Component{
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
                                        <input type="text" name="search" className="search_no" id="search" placeholder="Please input Keywords"/>
                                    </li>
                                    <li>
                                        <button type="submit" className="search_button_no">Search</button>
                                    </li>
                                        <li><a href="Login.html">Login</a></li>
                                    <li><a href="Singup.html" target="_parent">Sing Up</a></li>
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