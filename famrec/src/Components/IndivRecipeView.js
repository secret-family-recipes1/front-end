import React from 'react';

import IndivRecipe from './IndivRecipe';

class IndivRecipeView extends React.Component {
    state = {
        recipes: []
    };

    render() {
        return (
            <IndivRecipe 
                recipes={this.props.recipes}
                match={this.props.match}
            />
        )
    }
}

export default IndivRecipeView;