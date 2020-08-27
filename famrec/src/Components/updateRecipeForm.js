import React, {useState, useEffect, useRef} from 'react';
import {useHistory, useParams} from 'react-router-dom'
import {editEverything} from '../store/actions/recipeActions'
import {axiosWithAuth} from '../utils/axiosWithAuth'
import {connect} from 'react-redux'
import Styled from 'styled-components'
import {TweenMax, TimelineLite, Power3} from 'gsap'


const StyledForm = Styled.div`
width: 60%;
max-width: 700px;
margin: 2rem auto;
padding: 4rem 3rem;
border: 3px solid black;
border-radius: 20px;
background-color: rgba(65, 65, 65, 0.9);
box-shadow: 0 0 10px #827ffe;
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    input, textarea, label {
        width: 100%;
    }
    input, textarea{
        &:focus, &:hover{
            outline: none;
            border: 2px solid #827ffe;
        }
    }
    label {
        color: white;
        text-shadow: 2px 2px black;
    }
    textarea {
        padding: 1rem;
        background-color: #e6e6e6;
        color: #827ffe;
        font-size: 16px;
        margin-bottom: 20px;
        border: none;
    }
    button {
        width: 100%;
        padding: 0.75rem;
        border: none;
        outline: none;
        font-size: 1.35rem;
        background-color: rgba(1, 255, 9, 0.9);
        &:hover{
            transition: 0.5s;
            transform: scale(1.1);
            background-color: #827ffe;
            box-shadow: 0 0 10px rgb(1, 255, 9);
        }
    }
}
`


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

    let app = useRef(null) 
    let tl = new TimelineLite()

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

        TweenMax.to(app, 0, {css: {visibility: 'visible'}})
        tl.from(app, 1.2, {y: 1280, ease: Power3.easeOut})
        .from(app, 2, {rotate:15, ease: Power3.easeOut}, .3)
        .from(app, 2, {scale:1.1, ease: Power3.easeOut}, .3)
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
        <StyledForm ref={el => app = el}>
            <form onSubmit={submitHandler}>
                <label htmlFor='name'>Recipe Name
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name Of the Dish" 
                        onChange={handleChanges}
                        value={form.name}
                        required
                        ></input></label>
                <label htmlFor='category'>Recipe Category
                    <input
                        type="text" 
                        name="category" 
                        placeholder="Breakfast, Lunch, Dinner" 
                        onChange={handleChanges}
                        value={form.category}
                        required
                    ></input></label>
                <label htmlFor='source'>Recipe Source
                    <input 
                        type="text" 
                        name="source" 
                        placeholder="Grandma's" 
                        onChange={handleChanges}
                        value={form.source}
                        required
                        ></input></label>
                <label htmlFor='image'>Image
                    <input 
                        type="text" 
                        name="imageURL" 
                        placeholder="URL of image" 
                        onChange={handleChanges}
                        value={form.imageURL}
                        ></input></label>
                <label htmlFor='ingredients'>Ingredients
                    <textarea 
                        rows='4'
                        type="text" 
                        name="ingredient" 
                        placeholder="Olive, Pepper"
                        onChange={handleIngredients}
                        value={ingredients.ingredient}
                    ></textarea> </label>
                <label htmlFor='instructions'>Instructions
                    <textarea 
                        rows='4'
                        type="text" 
                        name="instruction" 
                        placeholder="How do you make it?"
                        onChange={handleInstructions}
                        value={instructions.instruction}
                    ></textarea> </label>
                <button>Edit Recipe</button>
            </form>
        </StyledForm>
    )
    
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        erros: state.errors
    }
}

export default connect(mapStateToProps, {editEverything})(UpdateRecipeForm)