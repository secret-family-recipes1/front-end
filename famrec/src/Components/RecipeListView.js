import React from 'react';
import axios from 'axios';

import RecipeList from './RecipeList';
import AddRecipeForm from './AddRecipeForm'
import authenticate from './Authenticate'


class RecipeListView extends React.Component {
    state = {
        recipes: [],
        editMode: false,
    };

    updateRecipe = () => {
        console.log("Hi there");
        
            return axios
                // API 
                .put(` API GOES HERE ${this.state.recipe.id}`, this.state.recipe)
                
                .then(res => {
                    console.log(res);
                    window.location = "/recipes";
                })
                .catch(err => {
                    console.log(err);
                    alert("There was an error while saving your recipe.");
                })
    }

    handleChange = e => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                [e.target.name]: e.target.value
            }
        });
    };


    toggleMode = (currentRecipe) => {
        
        this.setState(prevState => ({
            editMode: !prevState.editMode,
            recipe: {
                ...currentRecipe
            }
        }));
    }

    componentDidMount() {
    
    }

    render() {
        if (!this.state.editMode) {
            return (
            
            <div className="recipe-list-page">
                {this.props.recipes.map(recipe =>
                <RecipeList
                recipe={recipe}
                deleteRecipe={this.props.deleteRecipe}
                isLoggedIn={this.props.isLoggedIn}
                toggleMode={this.toggleMode}
                handleChange={this.handleChange}>
                </RecipeList>)}
                
                
            </div>
            )
    } else {
        return (
            <div>              
            {this.props.recipes.map(recipe =>
                <AddRecipeForm
                    handleChange={this.handleChange}
                    recipe={this.state.recipe}
                    addRecipe={this.updateRecipe}
                    toggleMode={this.toggleMode}
                ></AddRecipeForm>)}
            </div>  
        )
    }
}
}

export default authenticate(RecipeListView);