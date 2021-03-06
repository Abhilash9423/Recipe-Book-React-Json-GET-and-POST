import { useLocation } from 'react-router';
import useFetch from '../../hooks/useFetch'
import React from 'react';
import './Search.css'
import RecipeList from '../../components/RecipeList';




function Search(props) {

    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const query = queryParams.get('q')

    const url = 'http://localhost:3000/recipes?q=' + query
    const {error,isPending,data} = useFetch(url)

    return (
        <div>
            <h2 className="page-title" > Recipes Including "{query}" </h2>
            {error && <p className="error">{error}</p>}
            {isPending && <p className="loading" >Loading...</p> }
            {data && <RecipeList  recipies={data} />}
        </div>
    );
}

export default Search;