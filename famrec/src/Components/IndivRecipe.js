import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {searchRecipeById, deleteRecipe} from '../store/actions/recipeActions'
import {connect} from 'react-redux'


const IndivRecipe = props => {
const {id} = useParams()
const history = useHistory()

useEffect(() => {
    console.log(id)
 props.searchRecipeById(id)
},[])


    return (
        <div>
            <div>
                <img src={props.recipes.imageURL} alt='recipe image'></img>
                <h2>{props.recipes.name}</h2>
                <p>{props.recipes.source}</p>
                <p>Category: {props.recipes.category}</p>
                <p>{props.recipes.ingredients}</p>
                <p>{props.recipes.directions}</p>
                <button onClick={(evt) => {
                        evt.preventDefault()
                        props.deleteRecipe(id)
                        // history.push('/recipes')
                }}>Delete</button>
                <button onClick={(evt) => {
                        evt.preventDefault()
                        history.push(`/update-recipe/${id}`)
                }}>Edit</button>
            </div>
        </div>
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