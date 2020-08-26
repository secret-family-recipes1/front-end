import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {addRecipe, submitEverything} from '../store/actions/recipeActions'

import {connect} from 'react-redux'


const initialValues = {
    name: '',
    source: '',
    category: '',
    imageURL: ''
}

const ingredientsValues = {
    ingredient: ''
}

const instructionsValues = {
    instruction: ''
}

// Add new recipe form
const AddRecipeForm = (props) => {
    const [form, setForm] = useState(initialValues)
    const [ingredients, setIngredients] = useState(ingredientsValues)
    const [instructions, setInstructions] = useState(instructionsValues)

    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault();
        props.submitEverything(form, ingredients, instructions)
        history.push('/recipes')
    }

    const handleChanges = evt => {
        setForm({...form, [evt.target.name]: evt.target.value})
    }
    const handleIngredients = evt => {
        setIngredients({...ingredients, [evt.target.name]: evt.target.value})
    }
    const handleInstructions = evt => {
        setInstructions({...instructions, [evt.target.name]: evt.target.value})
    }

    return (
        <div className="recipesForm">

            <Form className= "recipesForm" onSubmit={submitHandler}>

                <FormGroup>
                    <Label for="recipe-title">Recipe Name</Label>
                    <Input 
                        type="text" 
                        name="name" 
                        placeholder="Name Of the Dish" 
                        onChange={handleChanges}
                        value={form.name}
                        required
                        />
                </FormGroup>

                <FormGroup class= "recipesForm">
                        <Label for="recipe-category">Recipe Category</Label>
                            <Input class= "recipesForm"
                                type="text" 
                                name="category" 
                                placeholder="Breakfast, Lunch, Dinner" 
                                onChange={handleChanges}
                                value={form.category}
                                required
                            />
                </FormGroup>
            
                <FormGroup>
                    <Label for="recipe-source">Recipe Source</Label>
                    <Input 
                        type="text" 
                        name="source" 
                        placeholder="Grandma's" 
                        onChange={handleChanges}
                        value={form.source}
                        required
                        />
                </FormGroup>

                <FormGroup>
                    <Label for="recipe-image">Image</Label>
                    <Input 
                        type="text" 
                        name="imageURL" 
                        placeholder="URL of image" 
                        onChange={handleChanges}
                        value={form.imageURL}
                        />
                </FormGroup>

                <FormGroup>
                    <Label for="recipe-ingredients">Ingredients</Label>
                    <Input 
                        type="textarea" 
                        name="ingredient" 
                        placeholder="Olive, Pepper"
                        onChange={handleIngredients}
                        value={ingredients.ingredient}
                        required
                    />
                </FormGroup> 
            
                <FormGroup>
                    <Label for="recipe-directions">Directions</Label>
                    <Input 
                        type="textarea" 
                        name="instruction" 
                        placeholder="How do you make it?"
                        onChange={handleInstructions}
                        value={instructions.instruction}
                        required
                    />
                </FormGroup> 
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

export default connect(mapStateToProps, {addRecipe, submitEverything})(AddRecipeForm)

