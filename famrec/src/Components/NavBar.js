import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/NavBar.css';

// Nav Bar
const NavBar = props => {

    return (
        <div className="navbar-wrapper">
            <div className="navbar-container">
                <div className="link-container">
                    <Link to='/' class="links">
                        <h2>Home</h2>
                    </Link> 
                    
                    <Link to='/add-recipe' class="links">
                        {props.isLoggedIn ? <h2>Add Recipe</h2> : null}
                    </Link>
                    
                    <Link to='/' onClick={props.logout} class="links" >
                        {props.isLoggedIn ? <h2>Logout</h2> : null}
                    </Link> 

                    <Link to='/signup' class="links">
                        {props.isLoggedIn ? null : <h2>Sign Up</h2>}
                    </Link>
                    
                    <Link to='/login' class="links">
                        {props.isLoggedIn ? null : <h2>Login</h2>}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavBar

