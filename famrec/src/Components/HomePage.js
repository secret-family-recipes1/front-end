import React from 'react';
import './HomePage.css';
import RecipeListView from './RecipeListView';
import Styled from 'styled-components'

const StyledDiv = Styled.div`
width: 90%;
max-width: 1200px;
margin: 2rem auto;
text-align: center;
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