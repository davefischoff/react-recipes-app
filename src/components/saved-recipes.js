import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';

class SavedRecipes extends Component {
    
    renderCard(recipe, index) {

        // if(
        //     ( this.props.recipeType === 'all' && (!this.props.query.length || (this.props.query.length && recipe.title.toLowerCase().includes(this.props.query.toLowerCase()))) ) || 
        //     ( this.props.recipeType === recipe.type && (!this.props.query.length || (this.props.query.length && recipe.title.toLowerCase().includes(this.props.query.toLowerCase()) )) )
        // ) {
            return (
                <div>{recipe.title}</div>
                // <Card 
                //     recipe={recipe} 
                //     key={index} 
                //     recipeType={this.props.recipeType}
                // />
            );
        // }

    }

    render() {
        const self = this;
        return (
            
        <div>
            <Link to={{ pathname: '/recipes'}}>Back to all recipes</Link>
            <div className="recipes-list">
                {this.props.savedRecipes.map((recipe, index) => (
                    self.renderCard(recipe, index)
                ))}
            </div>
        </div>
        );
    }
};



export default withRouter(SavedRecipes);