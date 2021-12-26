import {useParams} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import React from 'react';
import './Recipe.css'


function Recipe() {
    console.log("entered recipe")
    const { id } = useParams() 
    console.log(id)
    const url ='http://localhost:3000/recipes/' + id
    const {error,isPending,data:recipe} = useFetch(url)
    return (
        <div className="recipe" >   
            {error && <p className="error" >{error}</p>}
            {isPending && <p className="loading" >Loading...</p>}
            {recipe && (
                <>
                    <h2 className="page-title" >
                        {recipe.title}
                    </h2>
                    <p> Takes {recipe.cookingTime} to cook.  </p>
                    <ul> {recipe.ingredients.map(ing=><li>{ing} </li> )}
                     </ul>
                    <p className="method" >{recipe.method} </p>
                </>
            )}
        </div>
    );
}

export default Recipe;