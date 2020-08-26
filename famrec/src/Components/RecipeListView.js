import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {getRecipes} from '../store/actions/recipeActions'
import {useHistory} from 'react-router-dom'
import Styled from 'styled-components'

import RecipeCard from './RecipeList'

const StyledSearch = Styled.input`
text-align: center;
border-radius: 20px;
padding: 0.25rem;
width: 33%;
margin: 2rem;
box-shadow: 0 0 10px black;
`

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

// Recipe list component for recipes page
const RecipeListView = (props) => {
    const [search, setSearch] = useState('')

    const history = useHistory()

        useEffect(() => {
            props.getRecipes()
        }, [])

        const handleSearch = evt => {
            evt.preventDefault()
            setSearch(evt.target.value)
        }

return (
    <div>
        <StyledSearch
        placeholder='Search'
        name='search'
        onChange={handleSearch}
        value={search}
        ></StyledSearch>
        <StyledDiv>
            {(props.recipes != undefined && props.recipes.length > 0) ? (<div>{
            props.recipes
            .filter(recipe => {
                return (recipe.name.includes(search) || recipe.category.includes(search))
            })
            .map(recipe => {
                return <RecipeCard recipe={recipe} key={recipe.id}/>
            })
            } </div>) : <p>No recipes</p> }
        </StyledDiv>
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