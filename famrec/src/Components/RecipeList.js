import React from 'react';

import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

class RecipeList extends React.Component {
    constructor(props){
        super(props);
    }
   
    routeToRecipe(e, recipe) {
        e.preventDefault();
        this.props.history.push(`/recipe-list/${recipe.id}`);
    }

    handleDelete = () => {
        this.props.deleteRecipe(this.props.recipe.id,this.props.recipe.user_id)
    }

    handleEdit = () => {
        this.props.toggleMode(this.props.recipe)
    }

    render() {
        
        return (
                    <div className="recipe-card-list">
                        <Card>
                         <CardBody>
                            <CardTitle className="addInfoInput">{this.props.recipe.title}</CardTitle>
                            <CardSubtitle>Category: {this.props.recipe.category}</CardSubtitle>
                           <CardSubtitle>From the kitchen of: {this.props.recipe.source}</CardSubtitle>
                         
                             <CardText>Ingredients: {this.props.recipe.ingredients}</CardText>
                             <CardText>Instructions: {this.props.recipe.instructions}</CardText>
                       
                             <Button onClick={this.handleEdit.bind(this)}>Edit</Button>
                             <Button onClick={this.handleDelete.bind(this)}>Delete</Button>
                         </CardBody>
                        </Card>
                     </div>
        )
    }
}

export default RecipeList;