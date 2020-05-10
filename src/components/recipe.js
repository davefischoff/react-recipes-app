import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';

class Recipe extends Component {
    
    render(){
        
        const recipe = this.props.recipes.find(r => r.slug === this.props.match.params.recipeSlug);
        let recipeSaved = this.props.savedRecipes.find(r => r.slug === this.props.match.params.recipeSlug);

        let buttonText = "Save Recipe"
        if(recipeSaved) {
            buttonText = "Remove Recipe"
        }
        return (
        <div>
            <div className="header">
                <Link to={{ pathname: '/recipes'}}>Back to all recipes</Link>
                <Link to={{ pathname: '/saved-recipes'}}>Saved Recipes ({this.props.savedRecipes.length})</Link>
            </div>

            <div className="recipe-detail-upper">
                <div className="recipe-detail-upper-text">
                    <h1>{recipe.title}</h1>
                    <p>Servings: {recipe.servings}</p>
                    <p>Cook Time: {recipe.cookTimeInMinutes} minutes</p>
                    <button className="btn-save-recipe" onClick={() => this.props.toggleSavedRecipe(recipe)}>{buttonText}</button>
                </div>
                <div className="recipe-detail-img" style={{backgroundImage: 'url(' + recipe.image + ')'}}></div>
            </div>
            <div className="recipe-detail-wrapper">
                <div className="ingredients-wrapper">
                    <h5>Ingredients</h5>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} >{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className="instructions-wrapper">
                    <h5>Instructions</h5>
                    {recipe.steps.map((step, index) => (
                        <div key={index}>
                            <h6>Step {index + 1}</h6>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        );
    }   
};



export default withRouter(Recipe);