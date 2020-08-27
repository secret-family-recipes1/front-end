import React from 'react';
import { useHistory } from 'react-router-dom'
import Styled from 'styled-components'


const StyledDiv = Styled.div`
*{
    margin: 0;
    padding: 0;
}
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
/* justify-content: space-between; */
height: 450px;
box-shadow: 0 0 10px #827ffe;
background-color: rgba(65, 65, 65, 0.9);
color: white;
text-shadow: 2px 2px 4px black;
border-radius: 20px;
img {
    width: 100%;
    margin: 0;
    padding: 0;
    border-radius: 20px;
}
h2.cardHeader {
    font-size: 2rem;
    width: 100%;
    text-shadow: 2px 2px 4px black;
    color: #827ffe;
    margin: 1rem;
}
p {
    margin: 1rem;
}
`

// Recipe card for each recipe that displays on recipesList component
const RecipeList = props => {
    const { recipe } = props
    const history = useHistory()
        
    return (
        <StyledDiv className="recipe-card-list"
              onClick={(e) => {
                        e.preventDefault()
                        history.push(`/recipe/${recipe.id}/`)}}>
                    <img src={recipe.imageURL} alt='recipe image'></img>
                    <h2 class='cardHeader' >{recipe.name}</h2>
                    <p>Category: {recipe.category}</p>
                    <p>From the kitchen of: {recipe.source}</p>
        </StyledDiv>
    )
}

export default RecipeList;