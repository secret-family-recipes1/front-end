import React from 'react';
import { useHistory } from 'react-router-dom'


import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button , CardImg} from 'reactstrap';

const RecipeList = props => {
    const { recipe } = props
    const history = useHistory()
        
    return (
        <div className="recipe-card-list" >
            <Card  onClick={(e) => {
                        e.preventDefault()
                        history.push(`/recipe/${recipe.id}/`)}}>
                <CardBody>
                    <CardImg src={recipe.imageURL} alt='recipe image'></CardImg>
                    <CardTitle className="addInfoInput">{recipe.name}</CardTitle>
                    <CardSubtitle>Category: {recipe.category}</CardSubtitle>
                    <CardSubtitle>From the kitchen of: {recipe.source}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    )
}

export default RecipeList;