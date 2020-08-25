import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {searchRecipeById} from '../store/actions/recipeActions'
import {connect} from 'react-redux'


const IndivRecipe = props => {
const {id} = useParams()

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

export default connect(mapStateToProps, {searchRecipeById})(IndivRecipe)
// export default IndivRecipe;