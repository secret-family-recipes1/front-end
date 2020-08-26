import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom'
import {searchRecipeById, deleteRecipe} from '../store/actions/recipeActions'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth';



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
            setIngredients(res.data.data[0].ingredient)
        })
        .catch(err => {
            console.error(err)
        })
        axiosWithAuth()
        .get(`api/recipes/${id}/instructions`)
        .then(res => {
            console.log(res.data.data)
            setInstructions(res.data.data[0].instruction)
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
        <div>
            <div>
                <img src={props.recipes.imageURL} alt='recipe image'></img>
                <h2>{props.recipes.name}</h2>
                <p>{props.recipes.source}</p>
                <p>Category: {props.recipes.category}</p>
                <p>{ingredients}</p>
               <p>{instructions}</p>
                <button onClick={(evt) => {
                        evt.preventDefault()
                        props.deleteRecipe(id)
                        history.push('/recipes')
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