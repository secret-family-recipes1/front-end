import React from 'react';
import axios from 'axios';

import AddRecipeForm from './AddRecipeForm';
import authenticate from './Authenticate';

class AddRecipeView extends React.Component {
    constructor() {
        super();
        this.state = {
            recipe: {
                title: '',
                source: '',
                ingredients: '',
                instructions: '',
                category: '',
                user_id: '',
            },  
        };       
    }
    
    handleChange = e => {
        this.setState({
            recipe: {
                ...this.state.recipe,
                [e.target.name]: e.target.value
            }
        });
    };


    addRecipe = () => {
        console.log("Hi there");
        
            this.setState({
                        recipe: {
                            ...this.state.recipe,
                            user_id: this.props.user_id
                        }
                    }, () => { 

            return axios
                // API ADDRESS GOES HERE 
                .post(' // API ADDRESS /api/recipes', this.state.recipe)

                .then(res => {
                    console.log(res);
                    window.location = "/recipes";
                })
                .catch(err => {
                    console.log(err);
                    alert("There is an error while adding your recipe.");
                })
        })}
    
    render() {
        return (
            <div>
                <AddRecipeForm 
                    handleChange={this.handleChange}
                    recipe={this.state.recipe}
                    addRecipe={this.addRecipe}
                
                />
            </div>
        );
    }
}

export default authenticate(AddRecipeView);