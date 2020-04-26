import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';

class Recipe extends Component {
    
    render(){
        
        const recipe = this.props.recipes.find(r => r.slug === this.props.match.params.recipeSlug);
        let recipeSaved = this.props.savedRecipes.find(r => r.slug === this.props.match.params.recipeSlug);
        console.log(recipeSaved)

        let buttonText = "Save Recipe"
        if(recipeSaved) {
            buttonText = "Remove Recipe"
        }
        return (
        <div>
            <Link to={{ pathname: '/recipes'}}>Back</Link>
            Recipe :  {recipe.title}

        <button onClick={() => this.props.toggleSavedRecipe(recipe)}>{buttonText}</button>

        </div>

        );
    }   
};



export default withRouter(Recipe);