import React, {useState, useEffect, useRef} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {searchRecipeById, deleteRecipe} from '../store/actions/recipeActions'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Styled from 'styled-components'
import Loader from 'react-loader-spinner'
import {TweenMax, TimelineLite, Power3} from 'gsap'


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
    background-color: rgba(65, 65, 65, 0.9);
    box-shadow: 0 0 10px #827ffe, 0 0 5px #827ffe;
    text-shadow: 2px 2px 3px black;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    border: 3px solid black;
    color: white;
    overflow: hidden;
    img {
        width: 100%;
        border-radius: 20px 20px 0 0;
    }
    h2 {
        text-transform: capitalize;
        margin: 1rem 0;
        color: #827ffe;
    }
    ul, ol {
        /* list-style-position: inside; */
        padding-right: 10%;
    }
    button {
        width: 100%;
        padding: .5rem;
        border: none;
        &:hover {
            transform: scale(1.1);
        }
    }
    #edit {
        background-color: rgba(231, 167, 0, 0.7);
        margin-top: 4rem;
    }
    #delete {
        background-color: rgba(197, 0, 0, 0.7);
        border-radius: 0 0 20px 20px;
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
    }, [props.ingredients, props.instructions])

    let app = useRef(null) 
    let tl = new TimelineLite()
    
    useEffect(() => {
        // console.log(app)
        TweenMax.to(app, 0, {css: {visibility: 'visible'}})
        tl.from(app, 1.2, {y: 1280, ease: Power3.easeOut})
        .from(app, 2, {rotate:15, ease: Power3.easeOut}, .3)
        .from(app, 2, {scale:1.1, ease: Power3.easeOut}, .3)

    }, [])
        

    return (
        <StyledDiv ref={el => app = el}>
            {props.loading ? <Loader
                                        id='customLoader'
                                        type="ThreeDots"
                                        color="#827ffe"
                                        height={300}
                                        width={300}
                                        timeout={5000} //5 secs

                                    /> : 
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
                <button id='edit' onClick={(evt) => {
                    evt.preventDefault()
                    history.push(`/update-recipe/${id}`)
                }}>Edit</button>
                <button id='delete' onClick={(evt) => {
                        evt.preventDefault()
                        props.deleteRecipe(id)
                        history.push('/recipes')
                }}>Delete</button>
            </div> }
        </StyledDiv>
    )
}
const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        erros: state.errors,
        ingredients: state.ingredients,
        instructions: state.instructions,
        loading: state.loading
    }
}

export default connect(mapStateToProps, {searchRecipeById, deleteRecipe})(IndivRecipe)
// export default IndivRecipe;