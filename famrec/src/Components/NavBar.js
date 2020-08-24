import React from 'react';
import {Link} from 'react-router-dom';

import './NavBar.css';


const NavBar = props => {
    return (
        <div className="navbar-wrapper">
            <div className="navbar-container">
                <div className="link-container">
                
                    { <Link to='/' class="links">
                        <h2>Home</h2>
                    </Link> }
                    
                    <Link to='/signup' class="links">
                        <h2>{props.isLoggedIn ? null : "Sign Up"}</h2>
                    </Link>
                    

                    <Link to='/login' class="links">
                        <h2>{props.isLoggedIn ? null : "Login"}</h2>
                    </Link>

                    <Link to='/recipes' class="links">
                        <h2>{props.isLoggedIn ? "Recipes" : null}</h2>
                    </Link>
                    
                    <Link to='/addrecipe' class="links">
                        <h2>{props.isLoggedIn ? "Add Recipe" : null}</h2>
                    </Link>
                    
                    <Link to='/' onClick={props.logout} class="links" >
                        <h2>{props.isLoggedIn ? "Logout" : null}</h2>
                    </Link>

                   

                </div>

            </div>

        </div>
    );
}

export default NavBar;