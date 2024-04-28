import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import CreateProfileForm from "../components/CreateProfileForm";
import Footer from "../components/Footer";
import { AuthProvider, useAuth } from "../AuthContext";

const Home = ({ initialRecipes }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

      const response = await axios.get(
        `https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${apiKey}&number=5`,
      );
      const data = response.data;

      console.log("Search Query:", query);
      console.log("Fetched Recipes:", data);

      setRecipes(data || []);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      setError("Error fetching recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    setShowSignUpForm((prevShowSignUpForm) => !prevShowSignUpForm);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div>
      <AuthProvider>
        <main className="main">
          <button onClick={handleSignUpClick} className="button join-us-button">
            {showSignUpForm ? "Hide Form" : "Join Us"}
          </button>

          {showSignUpForm && <CreateProfileForm />}

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="body-content">
            <div className="subtitle-container">
              <p className="title">We're here to help you cook!</p>
              <p className="subtitle">
                uCook helps you discover delicious recipes and create amazing
                meals! With only the ingredients you have at home, you can count
                on us to help you find what your next meal will be. You can
                start with only two or up to six ingredients to build your
                cooking, all without having to shop for more!
              </p>
            </div>
            <div className="right-image-container">
              <Image
                src="/bodyimg.jpg"
                alt="right image"
                width={200}
                height={300}
                className="right-image"
              />
            </div>
          </div>
        </main>
      </AuthProvider>
      <Footer />
    </div>
  );
};

Home.getInitialProps = async () => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5`,
    );
    const initialRecipes = response.data || [];

    return {
      initialRecipes,
    };
  } catch (error) {
    console.error("Error fetching initial data:", error.message);

    return {
      initialRecipes: [],
    };
  }
};

export default Home;
