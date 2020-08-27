import React from 'react';
import {NavLink} from 'react-router-dom';
import '../styles/NavBar.css';
import Styled from 'styled-components'

const StyledNav = Styled.div`
margin-bottom: 2rem;
h2 {
    border: none;
    padding: 0.25rem 1.5rem;
    border-radius: 20px;
    background-color: #827ffe;
    font-size: 1.5rem;
    margin-bottom: 0;
    &:hover{
        transition: 0.5s;
        background-color: black;
        box-shadow: 0 0 10px #827ffe;
    }
}
a {
    text-decoration: none;
    text-transform: uppercase;
    margin-bottom: 0;
    margin-left: 0;
    color: black;
    &:hover{
        text-decoration: none;
        color: #827ffe;
    }
}
.active-nav{
    h2 {
        background-color: black;
        color: #827ffe;
    }
}
`

// Nav Bar
const NavBar = props => {

    return (
        <StyledNav className="navbar-wrapper">
            <div className="navbar-container">
                <div className="link-container">
                    <NavLink activeClassName='active-nav' to='/recipes' class="links">
                    {props.isLoggedIn ?  <h2>Home</h2> : null}
                    </NavLink> 
                    
                    <NavLink activeClassName='active-nav' to='/add-recipe' class="links">
                        {props.isLoggedIn ? <h2>Add Recipe</h2> : null}
                    </NavLink>
                    
                    <NavLink activeClassName='active-nav' to='/' onClick={props.logout} class="links" >
                        {props.isLoggedIn ? <h2>Logout</h2> : null}
                    </NavLink> 

                    <NavLink activeClassName='active-nav' to='/signup' class="links">
                        {props.isLoggedIn ? null : <h2>Sign Up</h2>}
                    </NavLink>
                    
                    <NavLink activeClassName='active-nav' to='/login' class="links">
                        {props.isLoggedIn ? null : <h2>Login</h2>}
                    </NavLink>
                </div>
            </div>
        </StyledNav>
    );
}

export default NavBar

