import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Recipe from './components/recipe';
// import { useState } from 'react';
import './index.css';


function Card(props) {
    
    return (

        <Link to={{ pathname: '/recipes/'+props.recipe.slug}}>
            <div className="recipe-card">
                <h3>{props.recipe.title}</h3>
                <h6>Cook Time: {props.recipe.cookTimeInMinutes} min.</h6>
                <h6>Servings: {props.recipe.servings}</h6>
            </div>
        </Link>
    );
}

// class Recipe extends React.Component {
//     render() {
//         console.log(this.data)
//         return(
//             this.data
//         )
//     }
//     // render(){
//     //     var recipe= data.find(r => r.slug == match.params.recipeSlug);
//     //     var recipeData;
      
//     //     if(recipe)
//     //       recipeData = <div>
//     //         <h3> {recipe.title} </h3>
//     //     </div>;
//     //     else
//     //       recipeData = <h2> Sorry. Recipe doesnt exist </h2>;
      
//     //     return (
//     //       <div>
//     //         <div>
//     //            {recipeData}
//     //         </div>
//     //       </div>
//     //     )   
//     // }
// }
  
class List extends React.Component {

    renderCard(recipe, index) {

        if((this.props.recipeType === 'all' && !this.props.query.length) || 
            this.props.recipeType === recipe.type
            || (this.props.query.length && recipe.title.toLowerCase().includes(this.props.query.toLowerCase()))) {
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

function Filter(props) {
    return (
        <li key={props.index}>
            <a href="#" 
            className={"filter-link " + (props.recipeType === props.filter.value ? 'selected' : '')}
            onClick={props.onClick}
            >
                {props.filter.name}
            </a>
        </li>
    )
}

class Filters extends React.Component {

    renderFilter(filter, index) {
        return(
            <Filter 
                filter={filter} 
                key={index}
                onClick={() => this.props.onClick(filter.value)}
                recipeType={this.props.recipeType}
            />
        )
    }

    render(){
        const self = this;
        return (
            <ul className="filters-list">
                <li>
                    <a href="#"
                        className={"filter-link " + (this.props.recipeType === 'all' ? 'selected' : '')}
                        onClick={() => this.props.onClick('all')}
                    >All</a>
                </li>
                {this.props.filters.map((filter, index) => (
                    self.renderFilter(filter,index)
                ))}
            </ul>
        )
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

    render() {

        return (
            <Switch>
                {/* <Route path="/" exact/> */}
                <Route path="/recipes/:recipeSlug"
                    render={ (props) => <Recipe recipes={this.state.recipes} {...props} />}/>
                <div className="recipes-page">
                    <div className="recipe-filters">
                        <Filters
                            recipeType={this.state.recipeType} 
                            filters={this.state.filters}
                            onClick={(value) => this.setRecipeType(value)}
                        />
                    </div>
                    <div className="recipe-list-wrapper">

                        <div>
                            <label>Search:</label>
                            <input type="text" value={this.state.query} onChange={this.handleSearch} />
                        </div>

                        <List
                            recipes={this.state.recipes} 
                            recipeType={this.state.recipeType} 
                            query={this.state.query}
                        />
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
  