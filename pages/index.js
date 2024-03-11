import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import logoImage from '../public/logo.jpg';
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

      const response = await axios.get(`http://localhost:3000/api/search?query=${query}`);
      const data = response.data;

      setRecipes(data.results || []);
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
          <img src={logoImage} alt="ucook Logo" />
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
    const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5`);
    const initialRecipes = response.data.results || [];

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
