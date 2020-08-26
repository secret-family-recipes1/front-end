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
                            <CardTitle className="addInfoInput">{recipe.name}</CardTitle>
                            <CardSubtitle>Category: {recipe.category}</CardSubtitle>
                           <CardSubtitle>From the kitchen of: {recipe.source}</CardSubtitle>
                            <img src={recipe.imageURL} alt='recipe image'></img>
                             <CardText>Ingredients: {recipe.ingredients}</CardText>
                             <CardText>Instructions: {recipe.instructions}</CardText>
                       
                             {/* <Button onClick={}>Edit</Button>
                             <Button onClick={}>Delete</Button> */}
                         </CardBody>
                        </Card>
                     </div>
        )
}

export default RecipeList;