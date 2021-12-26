import './RecipeList.css'
import {Link} from 'react-router-dom'
import React from 'react';


function RecipeList({recipies}) {


    if(recipies.length===0){
        return <div className="error" > No recipies to load... </div>
    }

    
    return (
        <div className="recipe-list" >
            {recipies.map(recipe =>(
                <div key={recipe.id} className="card" >
                    <h3>{recipe.title}</h3>
                    <p>{recipe.cookingTime} to make.. </p>
                    <div> {recipe.method.substring(0,100)}.... </div>
                    <Link to={`/recipes/${recipe.id}`} >Cook This </Link>
                    </div>
            ))}
        </div>
    );
}

export default RecipeList;