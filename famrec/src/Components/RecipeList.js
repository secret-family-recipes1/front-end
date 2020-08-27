import React, {useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import Styled from 'styled-components'
import {TweenMax, TimelineLite, Power3} from 'gsap'

const StyledDiv = Styled.div`
&:hover {
    transition: 0.5s;
    transform: scale(1.05);
    img {
        transition: 1s;
        transform: scale(1.1)
    }
}
visibility: hidden;
width: 30%;
max-width: 450px;
min-width: 350px;
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
cursor: pointer;
overflow: hidden;
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
        <StyledDiv className="recipe-card-list" ref={el => app = el}
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