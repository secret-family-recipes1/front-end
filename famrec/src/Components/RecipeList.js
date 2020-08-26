import React from 'react';
import {useHistory} from 'react-router-dom'


import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

const RecipeList = props => {
const {recipe} = props
const history = useHistory()

    // routeToRecipe(e, recipe) {
    //     e.preventDefault();
    //     this.props.history.push(`/recipe-list/${recipe.id}`);
    // }

    // handleDelete = () => {
    //     this.props.deleteRecipe(this.props.recipe.id,this.props.recipe.user_id)
    // }

    // handleEdit = () => {
    //     this.props.toggleMode(this.props.recipe)
    // }

        
        return (
                    <div className="recipe-card-list" >
                        <Card  onClick={(e) => {
                                 e.preventDefault()
                                    history.push(`/recipe/${recipe.id}/`)}}>
                         <CardBody>
                            <img src={recipe.imageURL} alt='recipe image'></img>
                            <CardTitle className="addInfoInput">{recipe.name}</CardTitle>
                            <CardSubtitle>Category: {recipe.category}</CardSubtitle>
                           <CardSubtitle>From the kitchen of: {recipe.source}</CardSubtitle>
                         </CardBody>
                        </Card>
                     </div>
        )
}

export default RecipeList;