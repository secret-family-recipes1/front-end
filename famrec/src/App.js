import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import HomePage from './Components/HomePage';
import RecipeCard from './Components/IndivRecipe';
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import PrivateRoute from './Components/privateRoute'
import AddRecipeForm from './Components/AddRecipeForm';
import UpdateRecipeForm from './Components/updateRecipeForm'
import Styled from 'styled-components'

const StyledApp = Styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
`

const App = () => {
  //If user is logged in, remove signup/login from the navBar
const [isLoggedIn, setIsLoggedIn] = useState()

useEffect(() => {
  if(localStorage.getItem('token') != null){
    setIsLoggedIn(true)
  }
}, [])

  const logout = () => {
    localStorage.clear(); 
    setIsLoggedIn(false)
    }

    return (
      <StyledApp>
      {/* NavBar */}
      <NavBar logout={logout} isLoggedIn={isLoggedIn}/>

      {/* Home page, redirects to login if not logged in, or recipes page when logged in */}
        <Switch>
          <Route exact path='/'>
            <Redirect to='/recipes'/>
          </Route>

          {/* Sign Up form */}
          <Route exact path="/signup" component={SignUp}/>

          {/* Login form */}
          <Route exact path="/login">
            <Login setIsLoggedIn={setIsLoggedIn}/>
          </Route>

          {/* Recipe list page */}
          <PrivateRoute exact path="/recipes" component={HomePage} />

          {/* Add new recipe form */}
          <PrivateRoute exact path='/add-recipe' component={AddRecipeForm} />

          {/* Show specific recipe by ID page */}
          <PrivateRoute exact path='/recipe/:id' component={RecipeCard}/>

          {/* Edit recipe form */}
          <PrivateRoute exact path='/update-recipe/:id' component={UpdateRecipeForm}/>
        </Switch>
      </StyledApp>
    );
}

export default App;
