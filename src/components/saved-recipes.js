import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import Card from './card';
import Filters from './filters';


class SavedRecipes extends Component {
    constructor(props){
        super(props);
        const allFilters = [
            {
                name: 'Main Course',
                value: 'main-course'
            },
            {
                name: 'Side Dish',
                value: 'side-dish'
            },
            {
                name: 'Snacks',
                value: 'snacks'
            },
            {
                name: 'Vegetarian',
                value: 'vegetarian'
            },
            {
                name: 'Chicken',
                value: 'chicken'
            },
            {
                name: 'Pork',
                value: 'pork'
            },
            {
                name: 'Fish',
                value: 'fish'
            }
        ];
        let filtersShown = allFilters.filter((filter) => {
            let showFilter = false
            this.props.savedRecipes.forEach((recipe) => {
                if (recipe.type.length) {
                   recipe.type.forEach((type) => {
                        if(type === filter.value) {
                            showFilter = true
                        }
                    })
                }
            })

            return showFilter
        });

        this.state = {
            filters: filtersShown,
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

        let showRecipe = ( this.state.recipeType === 'all' && (!this.state.query.length || (this.state.query.length && recipe.title.toLowerCase().includes(this.state.query.toLowerCase()))) ) || 
        ( recipe.type.includes(this.state.recipeType) && (!this.state.query.length || (this.state.query.length && recipe.title.toLowerCase().includes(this.state.query.toLowerCase()) )) )

        return (
            <Card 
                recipe={recipe} 
                key={index} 
                recipeType={this.props.recipeType}
                showRecipe={showRecipe}
            />
        );

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
                <div className="recipe-list-wrapper">
                    <div className="recipes-list">
                        {this.props.savedRecipes.map((recipe, index) => (
                            self.renderCard(recipe, index)
                        ))}
                    </div>
                </div>
            </div>
        </div>
        );
    }
};



export default withRouter(SavedRecipes);