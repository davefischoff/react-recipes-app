import React, { Component } from 'react';
import {withRouter} from 'react-router';

class Recipe extends Component {
    
    render(){
        const recipe = this.props.recipes.find(r => r.slug == this.props.match.params.recipeSlug);
        return (
        <div>
            Recipe :  {recipe.title}

        </div>

        );
    }   
};


// function recipe() {
    
//     // constructor(props) {
//     //     super(props);
//         this.state = {
//             recipeType: this.props.recipeType,
//         };

//         <h1>{this.state.recipeType}</h1>
//     // }

//     // render() {

//     //     return (
//     //         <h1>Recipe</h1>
//     //     )
//     // }
// }
// // function recipe() {
// //   return <h1>Recipe</h1>

// // }

export default withRouter(Recipe);