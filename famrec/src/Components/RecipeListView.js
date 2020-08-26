import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {getRecipes} from '../store/actions/recipeActions'
import {useHistory} from 'react-router-dom'
import Styled from 'styled-components'

import RecipeCard from './RecipeList'

const StyledDiv = Styled.div`
display: flex;
justify-content: center;
width: 100%;
div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
`


const RecipeListView = (props) => {

const history = useHistory()
    useEffect(() => {
        props.getRecipes()
    }, [])

return (
    <StyledDiv>
        {(props.recipes != undefined && props.recipes.length > 0) ? (<div>{
        props.recipes.map(recipe => {
            return <RecipeCard recipe={recipe} key={recipe.id}/>
        })
        } </div>) : <p>No recipes</p> }
    </StyledDiv>
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