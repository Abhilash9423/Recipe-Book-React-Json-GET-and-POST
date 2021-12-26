import React from 'react';
import './Home.css'
import useFetch from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList';


function Home(props) {
    const {data,isPending,error} = useFetch('http://localhost:3000/recipes')

    return (
        <div className="home" >
            {error && <p className="error" >{error}</p>}
            {isPending && <p className="loading">   Loading...</p>}
            {data && <RecipeList  recipies={data}/>}
        </div>
    );
}

export default Home;