import React from 'react';
import '../styles/HomePage.css';
import RecipeListView from './RecipeListView';
import Styled from 'styled-components'

const StyledDiv = Styled.div`
width: 90%;
max-width: 1200px;
margin: 2rem auto;
text-align: center;
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