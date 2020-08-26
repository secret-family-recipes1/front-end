import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {editEverything} from '../store/actions/recipeActions'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {connect} from 'react-redux'


const initialValues = {
    name: '',
    source: '',
    category: '',
    imageURL: ''
}

const ingredientsValues = {
    ingredient: '',
    id: ''
}

const instructionsValues = {
    instruction: '',
    id: ''
}

// Edit recipe form
const UpdateRecipeForm = (props) => {
    const [form, setForm] = useState(initialValues)
    const [ingredients, setIngredients] = useState(ingredientsValues)
    const [instructions, setInstructions] = useState(instructionsValues)

    const {id} = useParams()
    const history = useHistory()

    // Pulls the recipe, recipe instructions and ingredients on page render and populates the form
    useEffect(() => {
        axiosWithAuth()
        .get(`api/recipes/${id}`)
        .then(res => {
            setForm(res.data)
        })
        .catch(err => {
            console.error(err)
        })
        axiosWithAuth()
        .get(`api/recipes/${id}/ingredients`)
        .then(res => {
            console.log(res.data.data[0])
            setIngredients({...ingredients, ingredient: res.data.data[0].ingredient, id: res.data.data[0].id})
        })
        .catch(err => {
            console.error(err)
        })
        axiosWithAuth()
        .get(`api/recipes/${id}/instructions`)
        .then(res => {
            setInstructions({...instructions, instruction: res.data.data[0].instruction , id: res.data.data[0].id})
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    // Submits new information to action creator to dispatch put request
    const submitHandler = (e) => {
        e.preventDefault();
        props.editEverything(form, ingredients.ingredient, instructions.instruction, ingredients.id, instructions.id)
        history.push(`/recipe/${id}/`)
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

export default connect(mapStateToProps, {editEverything})(UpdateRecipeForm)