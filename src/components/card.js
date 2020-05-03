import React from 'react';
import { Link } from 'react-router-dom';

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

export default Card;