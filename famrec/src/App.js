import React, { useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import HomePage from './Components/HomePage';
import RecipeListView from './Components/RecipeListView';
import IndivRecipeView from './Components/IndivRecipeView';

import Login from './Components/Login'
import SignUp from './Components/SignUp'
import PrivateRoute from './Components/privateRoute'
import AddRecipeForm from './Components/AddRecipeForm';

const App = () => {
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
      <div className="App">
      <NavBar logout={logout} isLoggedIn={isLoggedIn}/>

        <Switch>
           <Route exact path='/'>
            <Redirect to='/recipes'/>
          </Route>

          <Route exact path="/signup" component={SignUp}/>

          <Route exact path="/login">
            <Login setIsLoggedIn={setIsLoggedIn}/>
          </Route>

          <PrivateRoute exact path="/recipes" component ={HomePage} />

          <PrivateRoute exact path='/add-recipe' component={AddRecipeForm} />

          <PrivateRoute exact path='/recipe-list/:id' />
        </Switch>
        
      </div>
    );
}

export default App;
