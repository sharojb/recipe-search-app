import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import CreateProfileForm from '../components/CreateProfileForm';
import '../styles/create.module.css';

const Home = ({ initialRecipes }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
      const response = await axios.get(`https://api.spoonacular.com/recipes/search?query=${query}&apiKey=4e1ab513731c4ffeaa22089bd7a2d2a3&number=5`);
      const data = response.data;

      console.log('Search Query:', query);
      console.log('Fetched Recipes:', response.data);

      setRecipes(response.data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error.message);
      setError('Error fetching recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  return (
    <div>
      <Head>
        <title>ucook</title>
        <meta name="description" content="Search for delicious recipes!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <h1>
          <img src='logo.png' alt="ucook Logo" />
        </h1>
        <SearchBar onSearch={handleSearch} />
        <button onClick={handleSignUpClick}>Sign Up</button>

        {showSignUpForm && <CreateProfileForm />}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <RecipeList recipes={recipes} />
      </main>

      <footer>
        <p>Cook With Us</p>
      </footer>
    </div>
  );
};

Home.getInitialProps = async () => {
  try {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=4e1ab513731c4ffeaa22089bd7a2d2a3&number=5`);
    const initialRecipes = response.data || [];

    return {
      initialRecipes,
    };
  } catch (error) {
    console.error('Error fetching initial data:', error.message);

    return {
      initialRecipes: [],
    };
  }
};

export default Home;