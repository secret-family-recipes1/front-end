import React from 'react';

import { Card,  CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

function IndivRecipe({recipes, match}) {
    const recipe = recipes.find(recipe => `${recipe.id}` === match.params.id);

    return (
        <div>
            <Card className="indv-recipe-card">
                <CardBody>
                    <CardTitle>{recipe.title}</CardTitle>
                    <CardSubtitle>{recipe.source}</CardSubtitle>

                    <CardText>{recipe.ingredients}</CardText>
                    <CardText>{recipe.directions}</CardText>
               </CardBody>
            </Card>
        </div>
    )
}

export default IndivRecipe;