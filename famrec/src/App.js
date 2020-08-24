import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import HomePage from './Components/HomePage';
import SignUpPageView from './Components/SignUpPageView';
import LoginPageView from './Components/LoginPageView';
import RecipeListView from './Components/RecipeListView';
import IndivRecipeView from './Components/IndivRecipeView';
import AddRecipeView from './Components/AddRecipeView';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      jwt: '',
      isLoggedIn: '',
      user_id: '',
      recipes: ''
    };
  }
  deleteRecipe(id,user) {
    axios // API GOES HERE
      .delete(` API  ${id}`)
     
      .then(  // ANOTHER API 
        axios
              .get(` API ${user}/users`)
              
              .then(window.location = "/recipes")
              .catch(err => {
                  console.log('Error retrieving recipes: ', err);
              })
      )


  }

  componentDidMount() {
    console.log("comp mounting");
    this.hydrateStateWithLocalStorage()
   }

  hydrateStateWithLocalStorage() {
    console.log("hydrating");
   
    for (let key in this.state) {

      if (localStorage.hasOwnProperty(key)) {
       
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
        if (key === 'user_id') {
        console.log(value);
        console.log('Logged in, fetching recipes')
          axios // ANOTHER API
              .get(` API ${value}/users`)
              .then(res => {
                  console.log('response', res.data);
                  this.setState(
                      {
                          recipes: res.data,
                          
                      }
                  );
              })
              .catch(err => {
                  console.log('Error retrieving recipes: ', err);
              });}
      }
    }
    return true
  }

  logout = () => {
    console.log("logging out");

    localStorage.clear();
    this.setState({
    jwt: '',
    isLoggedIn: false,
    user_id: '',
    });
  }

  render() {
    return (
      <div className="App">

        <NavBar isLoggedIn={this.state.isLoggedIn} logout={this.logout} />

        <Route exact path="/" component = {HomePage} />

        <Route exact path="/signup"
          render={props => <SignUpPageView {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id}/> }
        />

        <Route exact path="/login"
          render={props => <LoginPageView {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id}/> }
        />

        <Route exact path="/recipes"
          render={props => <RecipeListView {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id} recipes={Array.from(this.state.recipes)} deleteRecipe={this.deleteRecipe}/> }
        />

        <Route exact path='/recipe-list/:id'
          render={props => <IndivRecipeView {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id} recipes={Array.from(this.state.recipes)}/>}
        />

        <Route exact path='/addrecipe' 
          render={props => <AddRecipeView {...props} isLoggedIn={this.state.isLoggedIn} user_id={this.state.user_id}/>}
        />
        
      </div>
    );
  }
  
}

export default App;
