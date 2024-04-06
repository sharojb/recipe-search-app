import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import CreateProfileForm from '../components/CreateProfileForm';
import Footer from '../components/Footer';

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
      
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${apiKey}&number=5`
      );
      const data = response.data;

      console.log('Search Query:', query);
      console.log('Fetched Recipes:', data);

      setRecipes(data || []);
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
      <main className="main"> {/* Apply main class from global styles */}
        <SearchBar onSearch={handleSearch} />
        <button onClick={handleSignUpClick} className="button join-us-button">
          Join Us
        </button>

        {showSignUpForm && <CreateProfileForm />}

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <RecipeList recipes={recipes} />
      </main>

      <Footer />
    </div>
  );
};

Home.getInitialProps = async () => {
  try {
    const apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY; // Access directly from environment variable

    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5`
    );
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
