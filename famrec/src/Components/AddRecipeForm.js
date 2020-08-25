import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {addRecipe} from '../store/actions/recipeActions'
import {connect} from 'react-redux'


const initialValues = {
    recipeName: '',
    source: '',

}

const AddRecipeForm = (props) => {
    const [form, setForm] = useState(initialValues)
    const history = useHistory()

    const submitHandler = (e) =>{
        e.preventDefault();
        props.addRecipe(form)
        history.push('/recipes')
    }

    const handleChanges = evt => {
        setForm({...form, [evt.target.name]: evt.target.value})
    }
    
    return (
        <div className="recipesForm">

            <Form class= "recipesForm" onSubmit={submitHandler}>
{/* 
                    <FormGroup class= "recipesForm">
                        <Label for="recipe-category">Recipe Category</Label>
                            <Input class= "recipesForm"
                                type="text" 
                                name="category" 
                                placeholder="Breakfast, Lunch, Dinner" 
                                onChange={handleChanges}
                                value={props.recipe.category}
                                required
                            />
                </FormGroup> */}

                <FormGroup>
                    <Label for="recipe-title">Recipe Title</Label>
                    <Input 
                        type="text" 
                        name="recipeName" 
                        placeholder="Name Of the Dish" 
                        onChange={handleChanges}
                        value={form.recipeName}
                        required
                        />
                </FormGroup>
            
                <FormGroup>
                    <Label for="recipe-source">Source</Label>
                    <Input 
                        type="text" 
                        name="source" 
                        placeholder="Grandma's" 
                        onChange={handleChanges}
                        value={form.source}
                        required
                        />
                </FormGroup>

                {/* <FormGroup>
                    <Label for="recipe-ingredients">Ingredients</Label>
                    <Input 
                        type="textarea" 
                        name="ingredients" 
                        placeholder="Olive, Pepper"
                        onChange={handleChanges}
                        value={props.recipe.ingredients}
                        required
                    />
                </FormGroup>
            
                <FormGroup>
                    <Label for="recipe-directions">Directions</Label>
                    <Input 
                        type="textarea" 
                        name="instructions" 
                        placeholder="How do you make it?"
                        onChange={handleChanges}
                        value={props.recipe.instructions}
                        required
                    />
                </FormGroup> */}
                <Button type="submit">Save Recipe</Button>
           
            </Form>
        </div>
    )
    
}


const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        erros: state.errors
    }
}

export default connect(mapStateToProps, {addRecipe})(AddRecipeForm)

