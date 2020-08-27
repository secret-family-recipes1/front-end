import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {getRecipes} from '../store/actions/recipeActions'
import {useHistory} from 'react-router-dom'
import Styled from 'styled-components'
import Loader from 'react-loader-spinner'

import RecipeCard from './RecipeList'

const StyledSearch = Styled.input`
text-align: center;
border-radius: 20px;
padding: 0.33rem;
width: 33%;
margin: 2rem;
box-shadow: 0 0 10px #827ffe;
color: #827ffe;
border: 2px solid black;
&:focus {
    outline: none;
    border: 3px solid #827ffe;
    transition: 0.5s;
    transform: scale(1.1);
    box-shadow: 0 0 10px #827ffe;
}
`

const StyledDiv = Styled.div`
display: flex;
justify-content: center;
width: 100%;
flex-wrap: wrap;
div#recipeList {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
#customLoader{
    margin: 0 auto;
}
`

// Recipe list component for recipes page
const RecipeListView = (props) => {
    const [search, setSearch] = useState('')
    const [recipesList, setRecipesList] = useState()

    const history = useHistory()

        useEffect(() => {
            props.getRecipes()
            setRecipesList(props.recipes)
        }, [recipesList])

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
            {props.loading ? <Loader
                                        id='customLoader'
                                        type="ThreeDots"
                                        color="#827ffe"
                                        height={300}
                                        width={300}
                                        timeout={5000} //5 secs

                                    /> : null}
            {(props.recipes && props.recipes != undefined && props.recipes.length > 0 && !props.loading) ? (<div id='recipeList'>{
            props.recipes
            .filter(recipe => {
                return (recipe.name.includes(search) || recipe.category.includes(search))
            })
            .map(recipe => {
                return <RecipeCard recipe={recipe} key={recipe.id}/>
            })
            } </div>) : null}
        </StyledDiv>
    </div>
)
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes,
        erros: state.errors,
        loading: state.loading
    }
}

export default connect(mapStateToProps, {getRecipes})(RecipeListView)
// export default RecipeListView