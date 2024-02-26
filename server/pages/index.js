import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './client/src/components/SearchBar';  
import RecipeList from './client/src/components/RecipeList';



const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const serverUrl = 'http://localhost:3000';

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`${serverUrl}/api/search?query=${query}`);
      const data = response.data;

      console.log('Search Query:', query);
      console.log('Fetched Recipes:', data.results);

      setRecipes(data.results || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Recipe Search App</title>
        <meta name="description" content="Search for delicious recipes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Recipe Search App</h1>
        <SearchBar onSearch={handleSearch} />
        <RecipeList recipes={recipes} />
      </main>

      <footer>
        <p>Footer content</p>
      </footer>
    </div>
  );
};

export default Home;
