import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {searchRecipeById, deleteRecipe} from '../store/actions/recipeActions'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Styled from 'styled-components'

const StyledDiv = Styled.div`
width: 100%;
display: flex;
justify-content: center;
div {
    width: 65%;
    max-width: 800px;
    min-width: 500px;
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
    /* border: 2px solid black; */
    background-color: rgba(224, 220, 220, 0.9);
    box-shadow: 0 0 10px black, 0 0 5px;
    text-shadow: 2px 2px 3px white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    border: 3px solid black;
    img {
        width: 100%;
        border-radius: 20px;
    }
    h2 {
        text-transform: capitalize;
        margin: 1rem 0;
    }
    ul, ol {
        /* list-style-position: inside; */
        padding-right: 10%;
    }
    button {
        width: 100%;
        padding: .5rem;
    }
    button:nth-of-type(2){
        margin-bottom: 0.75rem;
    }
}
`

// Show specific recipe by ID page
const IndivRecipe = props => {
    const [ingredients, setIngredients] = useState()
    const [instructions, setInstructions] = useState()

    const {id} = useParams()
    const history = useHistory()

    // Pulls the ingredients and instructions for the specific recipe from backend on render
    useEffect(() => {
        console.log(id)
        // searches recipe by ID using action creator
        props.searchRecipeById(id)
        // Searches recipe's ingredients
        axiosWithAuth()
        .get(`api/recipes/${id}/ingredients`)
        .then(res => {
            console.log(res.data.data[0].ingredient)
            // Turn string of instructions into an array that can be looped through in jsx
            const ingredArr = res.data.data[0].ingredient.split(',')
            setIngredients(ingredArr)
        })
        .catch(err => {
            console.error(err)
        })
        // Searches recipe's instructions
        axiosWithAuth()
        .get(`api/recipes/${id}/instructions`)
        .then(res => {
            console.log(res.data.data)
             // Turn string of instructions into an array that can be looped through in jsx
            const instructionsArray = res.data.data[0].instruction.split(',')
            setInstructions(instructionsArray)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    return (
        <StyledDiv>
            <div>
                <img src={props.recipes.imageURL} alt='recipe image'></img>
                <h2>{props.recipes.name}</h2>
                <p>Recipe source: {props.recipes.source}</p>
                <p>Category: {props.recipes.category}</p>
                <p>Ingredients:</p>
                <ul>
                {ingredients && ingredients.length > 0 ? ingredients.map(ingred => {
                    return <li>{ingred}</li>
                }) : <p>No ingredients are available for this recipe</p>}
                </ul>
                <p>Instructions:</p>
                <ol>
                {instructions && instructions.length > 0 ? instructions.map(instr => {
                    return <li>{instr}</li>
                }): <p>No instructions are available for this recipe</p>}
                </ol>
               {/* <p>{instructions}</p> */}
                <button onClick={(evt) => {
                    evt.preventDefault()
                    history.push(`/update-recipe/${id}`)
                }}>Edit</button>
                <button onClick={(evt) => {
                        evt.preventDefault()
                        props.deleteRecipe(id)
                        history.push('/recipes')
                }}>Delete</button>
            </div>
        </StyledDiv>
    )
}
const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        erros: state.errors
    }
}

export default connect(mapStateToProps, {searchRecipeById, deleteRecipe})(IndivRecipe)
// export default IndivRecipe;