import React from 'react';
import { useHistory } from 'react-router-dom'
import Styled from 'styled-components'


const StyledDiv = Styled.div`
&:hover {
    transition: 0.5s;
    transform: scale(1.05);
}
width: 30%;
max-width: 350px;
margin: 20px 0;
display: flex;
flex-direction: column;
flex-wrap: nowrap;
height: 450px;
box-shadow: 0 0 10px black;
img {
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 20px;
}
h2 {
    margin-top: 0.5rem;
    font-size: 2rem;
    width: 100%;
}
`

// Recipe card for each recipe that displays on recipesList component
const RecipeList = props => {
    const { recipe } = props
    const history = useHistory()
        
    return (
        <StyledDiv className="recipe-card-list" >
            <div  onClick={(e) => {
                        e.preventDefault()
                        history.push(`/recipe/${recipe.id}/`)}}>
                    <img src={recipe.imageURL} alt='recipe image'></img>
                    <h2>{recipe.name}</h2>
                    <p>Category: {recipe.category}</p>
                    <p>From the kitchen of: {recipe.source}</p>
            </div>
        </StyledDiv>
    )
}

export default RecipeList;