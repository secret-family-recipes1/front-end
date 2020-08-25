import React from 'react';
import './HomePage.css';
import RecipeListView from './RecipeListView';


const HomePage = () => {

        return (
            <div>
                <h2>Your family's secret recipes</h2>
                <RecipeListView />
            </div>
        )
}

export default HomePage;