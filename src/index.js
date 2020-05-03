import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Recipe from './components/recipe';
import Card from './components/card';
import Filters from './components/filters';
import SavedRecipes from './components/saved-recipes';
// import { useState } from 'react';
import './index.css';

class List extends React.Component {

    renderCard(recipe, index) {

        if(
            ( this.props.recipeType === 'all' && (!this.props.query.length || (this.props.query.length && recipe.title.toLowerCase().includes(this.props.query.toLowerCase()))) ) || 
            ( this.props.recipeType === recipe.type && (!this.props.query.length || (this.props.query.length && recipe.title.toLowerCase().includes(this.props.query.toLowerCase()) )) )
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
            <div className="recipes-list">
                {this.props.recipes.map((recipe, index) => (
                    self.renderCard(recipe, index)
                ))}
            </div>
        </div>
        );
    }
}
  
class Recipes extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            recipes: [
                {
                    title: 'Mashed Potatoes',
                    slug: 'mashed-potatoes',
                    cookTimeInMinutes: 45,
                    servings: 4,
                    ingredients: [
                        '2 cups potatoes',
                        '1/2 cup milk'
                    ],
                    steps: [
                        'Step 1 Mashed Potatoes.',
                        'Step 2 Mashed Potatoes.'
                    ],
                    type: 'side-dish'
                },
                {
                    title: 'Beef Stew',
                    slug: 'beef-stew',
                    cookTimeInMinutes: 60,
                    servings: 6,
                    ingredients: [
                        '1 lb beef',
                        '1 cup chopped carrots',
                        '1 cup chopped onion'
                    ],
                    steps: [
                        'Step 1 Beef Stew.',
                        'Step 2 Beef Stew.'
                    ],
                    type: 'main-course'
                },
                {
                    title: 'Chicken Tacos',
                    slug: 'chicken-tacos',
                    cookTimeInMinutes: 30,
                    servings: 4,
                    ingredients: [
                        '1 lb chicken',
                        '8 tortillas',
                        '8 sprigs cilantro',
                        '1/2 cup chopped onion'
                    ],
                    steps: [
                        'Step 1 Chicken Tacos.',
                        'Step 2 Chicken Tacos.'
                    ],
                    type: 'main-course'
                },
                {
                    title: 'Roasted Carrots',
                    slug: 'roasted-carrots',
                    cookTimeInMinutes: 40,
                    servings: 4,
                    ingredients: [
                        '1 lb carrots, quartered',
                        '2 tbsp olive oil',
                        'salt to taste'
                    ],
                    steps: [
                        'Step 1 Roasted Carrots.',
                        'Step 2 Roasted Carrots.'
                    ],
                    type: 'side-dish'
                }
            ],
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
            query: '',
            savedRecipes: []
        }

        this.setRecipeType = this.setRecipeType.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleSavedRecipe = this.toggleSavedRecipe.bind(this);
    }

    setRecipeType(value) {
        this.setState({recipeType: value});
    }

    handleSearch(event) {
        this.setState({query: event.target.value});
    }

    toggleSavedRecipe(recipe) {
        // make a copy of savedRecipes state array
        let savedRecipes = [...this.state.savedRecipes]
        let index = savedRecipes.indexOf(recipe)
        if (index !== -1) {
            savedRecipes.splice(index, 1);
        } else {
            savedRecipes.push(recipe)
        }
        this.setState({savedRecipes: savedRecipes});

    }

    render() {

        return (
            <Switch>
                {/* <Route path="/" exact/> */}
                <Route path="/recipes/:recipeSlug"
                    render={ (props) => <Recipe recipes={this.state.recipes} savedRecipes={this.state.savedRecipes} toggleSavedRecipe={this.toggleSavedRecipe} {...props} />}/>

                <Route path="/saved-recipes"
                    render={ (props) => <SavedRecipes savedRecipes={this.state.savedRecipes} {...props} />}/>
                <div>
                    <div className="header header-main">
                        <div>
                            <label>Search:</label>
                            <input type="text" value={this.state.query} onChange={this.handleSearch} />
                        </div>

                        <Link to={{ pathname: '/saved-recipes'}}>Saved Recipes ({this.state.savedRecipes.length})</Link>
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

                        <List
                            recipes={this.state.recipes} 
                            recipeType={this.state.recipeType} 
                            query={this.state.query}
                        />
                    </div>
                </div>
                </div>
            </Switch>
        );
    }
}

  
// ========================================
  
ReactDOM.render(
    <BrowserRouter>
        <Recipes />
    </BrowserRouter>,
    document.getElementById('root')
);
  