import React from 'react';
import '../styles/HomePage.css';
import RecipeListView from './RecipeListView';
import Styled from 'styled-components'

const StyledDiv = Styled.div`
width: 80%;
max-width: 1100px;
margin: 1rem auto 4rem;
text-align: center;
background-color: rgba(65, 65, 65, 0.5);
box-shadow: 0 0 10px #827ffe, 0 0 5px #827ffe;
border-radius: 20px;
padding: 3rem;
h2 {
    text-shadow: 2px 2px 4px white, -1px -1px 4px white;
    font-size: 3rem;
    text-transform: capitalize;
}
`

// Home page
const HomePage = () => {
        return (
            <StyledDiv>
                <h2>Your family's secret recipes</h2>
                <RecipeListView />
            </StyledDiv>
        )
}

export default HomePage;