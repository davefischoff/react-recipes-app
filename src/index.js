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
            ( recipe.type.includes(this.props.recipeType) && (!this.props.query.length || (this.props.query.length && recipe.title.toLowerCase().includes(this.props.query.toLowerCase()) )) )
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
                    title: 'Baked Kale Chips',
                    slug: 'baked-kale-chips',
                    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3538064.jpg&w=596&h=596&c=sc&poi=face&q=85',
                    cookTimeInMinutes: 20,
                    servings: 6,
                    ingredients: [
                        '1 bunch kale',
                        '1 tablespoon olive oil',
                        '1 teaspoon seasoned salt',
                    ],
                    steps: [
                        'Preheat an oven to 350 degrees F (175 degrees C). Line a non insulated cookie sheet with parchment paper.',
                        'With a knife or kitchen shears carefully remove the leaves from the thick stems and tear into bite size pieces. Wash and thoroughly dry kale with a salad spinner. Drizzle kale with olive oil and sprinkle with seasoning salt.',
                        'Bake until the edges brown but are not burnt, 10 to 15 minutes.'
                    ],
                    type: ['snacks', 'vegetarian']
                },
                {
                    title: 'Easy Garlic Chicken',
                    slug: 'easy-garlic-chicken',
                    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1779766.jpg&w=596&h=399&c=sc&poi=face&q=85',
                    cookTimeInMinutes: 20,
                    servings: 4,
                    ingredients: [
                        '3 tablespoons butter',
                        '4 skinless, boneless chicken breast halves',
                        '2 teaspoons garlic powder',
                        '1 teaspoon seasoning salt',
                        '1 teaspoon onion powder'
                    ],
                    steps: [
                        'Melt butter in a large skillet over medium high heat. Add chicken and sprinkle with garlic powder, seasoning salt and onion powder. Saute about 10 to 15 minutes on each side, or until chicken is cooked through and juices run clear.'
                    ],
                    type: ['main-course', 'chicken']
                },
                {
                    title: 'Baked Salmon Fillets Dijon',
                    slug: 'baked-salmon-fillets-dijon',
                    image: 'https://images.media-allrecipes.com/userphotos/720x405/5917065.jpg',
                    cookTimeInMinutes: 25,
                    servings: 4,
                    ingredients: [
                        '4 (4 ounce) fillets salmon',
                        '3 tablespoons prepared Dijon-style mustard',
                        '1/4 cup Italian-style dry bread crumbs',
                        '1/4 cup butter, melted',
                        'salt and pepper to taste'
                    ],
                    steps: [
                        'Preheat oven to 400 degrees F (200 degrees C). Line a shallow baking pan with aluminum foil.',
                        'Place salmon skin-side down on foil. Spread a thin layer of mustard on the top of each fillet, and season with salt and pepper. Top with bread crumbs, then drizzle with melted butter.',
                        'Bake in a preheated oven for 15 minutes, or until salmon flakes easily with a fork.'
                    ],
                    type: ['main-course', 'fish']
                },
                {
                    title: 'Roasted Butternut Squash',
                    slug: 'roasted-butternut-squash',
                    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1170363.jpg&w=596&h=792&c=sc&poi=face&q=85',
                    cookTimeInMinutes: 40,
                    servings: 4,
                    ingredients: [
                        '1 butternut squash - peeled, seeded, and cut into 1-inch cubes',
                        '2 tablespoons olive oil',
                        '2 cloves garlic, minced',
                        'salt and ground black pepper to taste'
                    ],
                    steps: [
                        'Preheat oven to 400 degrees F (200 degrees C).',
                        'Toss butternut squash with olive oil and garlic in a large bowl. Season with salt and black pepper. Arrange coated squash on a baking sheet.',
                        'Roast in the preheated oven until squash is tender and lightly browned, 25 to 30 minutes.'
                    ],
                    type: ['side-dish', 'vegetarian']
                },
                {
                    title: 'Potato Chips',
                    slug: 'potato-chips',
                    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F364171.jpg&w=596&h=399&c=sc&poi=face&q=85',
                    cookTimeInMinutes: 35,
                    servings: 4,
                    ingredients: [
                        '1 tablespoon vegetable oil',
                        '1 potato, sliced paper thin (peel optional)',
                        '½ teaspoon salt, or to taste'
                    ],
                    steps: [
                        'Pour the vegetable oil into a plastic bag (a produce bag works well). Add the potato slices, and shake to coat.',
                        'Coat a large dinner plate lightly with oil or cooking spray. Arrange potato slices in a single layer on the dish.',
                        'Cook in the microwave for 3 to 5 minutes, or until lightly browned (if not browned, they will not become crisp). Times will vary depending on the power of your microwave. Remove chips from plate, and toss with salt (or other seasonings). Let cool. Repeat process with the remaining potato slices. You will not need to keep oiling the plate.'
                    ],
                    type: ['snacks', 'vegetarian']
                },
                {
                    title: 'Fried Cabbage and Egg Noodles',
                    slug: 'fried-cabbage-and-egg-noodles',
                    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F355377.jpg&w=596&h=399&c=sc&poi=face&q=85',
                    cookTimeInMinutes: 20,
                    servings: 4,
                    ingredients: [
                        '1 (16 ounce) package egg noodles',
                        '1 stick butter',
                        '1 medium head green cabbage, chopped',
                        'salt and pepper to taste'
                    ],
                    steps: [
                        'Bring a large pot of lightly salted water to a boil. Cook the egg noodles in the boiling water until the pasta is tender yet firm to the bite, about 5 minutes. Drain.',
                        'While the noodles cook, melt the butter in a large skillet over low heat. Add the cabbage to the melted butter; season with salt and pepper. Cover and cook until the cabbage begins to brown, 5 to 7 minutes. Stir the drained noodles into the cabbage; cook and stir until the noodles begin to brown, about 5 minutes.'
                    ],
                    type: ['main-course', 'vegetarian']
                },
                {
                    title: 'Glazed Carrots',
                    slug: 'glazed-carrots',
                    image: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4655044.jpg&q=85',
                    cookTimeInMinutes: 25,
                    servings: 8,
                    ingredients: [
                        '2 pounds carrots, peeled and cut into sticks',
                        '¼ cup butter',
                        '¼ cup packed brown sugar',
                        '¼ teaspoon salt',
                        '⅛ teaspoon ground white pepper'
                    ],
                    steps: [
                        'Place carrots into a large saucepan, pour in enough water to reach depth of 1 inch, and bring to a boil. Reduce heat to low, cover, and simmer carrots until tender, 8 to 10 minutes. Drain and transfer to a bowl.',
                        'Melt butter in the same saucepan; stir brown sugar, salt, and white pepper into butter until brown sugar and salt have dissolved. Transfer carrots into brown sugar sauce; cook and stir until carrots are glazed with sauce, about 5 more minutes.'
                    ],
                    type: ['side-dish', 'vegetarian']
                },
                {
                    title: 'Kielbasa with Peppers and Potatoes',
                    slug: 'kielbasa-with-peppers-and-potatoes',
                    image: 'https://images.media-allrecipes.com/userphotos/720x405/677450.jpg',
                    cookTimeInMinutes: 40,
                    servings: 6,
                    ingredients: [
                        '1 tablespoon vegetable oil',
                        '1 (16 ounce) package smoked kielbasa sausage, diced',
                        '6 medium red potatoes, diced',
                        '1 red bell pepper, sliced',
                        '1 yellow bell pepper, sliced'
                    ],
                    steps: [
                        'Heat the oil in a saucepan over medium heat. Place kielbasa and potatoes in the saucepan. Cover, and cook 25 minutes, stirring occasionally, until potatoes are tender.',
                        'Mix red bell pepper and yellow bell pepper into the saucepan, and continue cooking 5 minutes, until peppers are just tender.'
                    ],
                    type: ['main-course', 'pork']
                },
            ],
            filters: [
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
  