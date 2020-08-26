import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getRecipes} from '../store/actions/recipeActions'
import {useHistory} from 'react-router-dom'

import RecipeCard from './RecipeList'


const RecipeListView = (props) => {

const history = useHistory()
    useEffect(() => {
        props.getRecipes()
    }, [])

return (
    <div>
        {(props.recipes != undefined && props.recipes.length > 0) ? (<div>{
        props.recipes.map(recipe => {
            return <RecipeCard recipe={recipe} key={recipe.id}/>
        })
        } </div>) : <p>No recipes</p> }
    </div>
)
}


const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        erros: state.errors
    }
}

export default connect(mapStateToProps, {getRecipes})(RecipeListView)
// export default RecipeListView