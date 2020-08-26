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
    background-color: rgba(104, 104, 104, 0.8);
    box-shadow: 0 0 10px black, 0 0 5px;
    color: white;
    text-shadow: 2px 2px 3px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
        width: 100%;
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

}
`


const IndivRecipe = props => {
    const [ingredients, setIngredients] = useState()
    const [instructions, setInstructions] = useState()

    const {id} = useParams()
    const history = useHistory()

    useEffect(() => {
        axiosWithAuth()
        .get(`api/recipes/${id}/ingredients`)
        .then(res => {
            console.log(res.data.data[0].ingredient)
            const ingredArr = res.data.data[0].ingredient.split(',')
            setIngredients(ingredArr)
        })
        .catch(err => {
            console.error(err)
        })
        axiosWithAuth()
        .get(`api/recipes/${id}/instructions`)
        .then(res => {
            console.log(res.data.data)
            const instructionsArray = res.data.data[0].instruction.split(',')
            setInstructions(instructionsArray)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    useEffect(() => {
        console.log(id)
    props.searchRecipeById(id)
    },[])


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