import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import RecipeList from '../components/RecipeList';

const SearchResults = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
        const data = response.data;

        console.log('Search Query:', query);
        console.log('Fetched Recipes:', data.results);

        setRecipes(data.results || []);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
        setError('Error fetching recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div>
      <Head>
        <title>ucook - Search Results</title>
        <meta name="description" content="Search results for your recipe!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Search Results for: {query}</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <RecipeList recipes={recipes} />
    </div>
  );
};

SearchResults.getInitialProps = async ({ query }) => {
  return { query };
};

export default SearchResults;
