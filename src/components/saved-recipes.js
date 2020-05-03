import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import Card from './card';
import Filters from './filters';


class SavedRecipes extends Component {
    constructor(props){
        super(props);
        this.state = {
            filters: [
                {
                    name: 'Main Course',
                    value: 'main-course'
                },
                {
                    name: 'Side Dish',
                    value: 'side-dish'
                }
            ],
            recipeType: 'all',
            query: ''
        }

        this.setRecipeType = this.setRecipeType.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    setRecipeType(value) {
        this.setState({recipeType: value});
    }

    handleSearch(event) {
        this.setState({query: event.target.value});
    }

    
    renderCard(recipe, index) {

        if(
            ( this.state.recipeType === 'all' && (!this.state.query.length || (this.state.query.length && recipe.title.toLowerCase().includes(this.state.query.toLowerCase()))) ) || 
            ( this.state.recipeType === recipe.type && (!this.state.query.length || (this.state.query.length && recipe.title.toLowerCase().includes(this.state.query.toLowerCase()) )) )
        ) {
            return (
                <Card 
                    recipe={recipe} 
                    key={index} 
                    recipeType={this.props.recipeType}
                />
            );
        }

    }

    render() {
        const self = this;
        return (
            
        <div>
            <div className="header header-saved-recipes">
                <Link to={{ pathname: '/recipes'}}>Back to all recipes</Link>
                <div>
                    <label>Search:</label>
                    <input type="text" value={this.state.query} onChange={this.handleSearch} />
                </div>

                <Link to={{ pathname: '/saved-recipes'}}>Saved Recipes ({this.props.savedRecipes.length})</Link>
            </div>

            <div className="recipes-page">
                <div className="recipe-filters">
                    <Filters
                        recipeType={this.state.recipeType} 
                        filters={this.state.filters}
                        onClick={(value) => this.setRecipeType(value)}
                    />
                </div>

                <div className="recipes-list">
                    {this.props.savedRecipes.map((recipe, index) => (
                        self.renderCard(recipe, index)
                    ))}
                </div>
            </div>
        </div>
        );
    }
};



export default withRouter(SavedRecipes);