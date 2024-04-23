import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import CreateProfileForm from "../components/CreateProfileForm";
import Footer from "../components/Footer";
import { AuthProvider, useAuth } from "../AuthContext";
import FavoritesList from "../components/FavoritesList";
import Header from "../components/Header";
import styles from "../styles/favorites.module.css";

const Home = ({ initialRecipes }) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // const [isFavorited, setIsFavorited] = useState(false);
  // const { getUserId, user } = useAuth();
  // const isLoggedIn = user !== null;
  // const [username, setName] = useState("");
  // const [showFavorites, setShowFavorites] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const { login } = useAuth();

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

  // const toggleFavorite = async (recipeId) => {
  //   try {
  //     const userId = getUserId();

  //     const response = await fetch(
  //       `http://localhost:5000/api/${isFavorited ? "removefavorites" : "addfavorites"}/${userId}/${recipeId}`,
  //     );

  //     if (response.ok) {
  //       setIsFavorited(!isFavorited);
  //     } else {
  //       console.error("Failed to update favorite status:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error updating favorite status:", error);
  //   }
  // };

  const handleSignUpClick = () => {
    setShowSignUpForm((prevShowSignUpForm) => !prevShowSignUpForm);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password", password);

  //   try {
  //     const data_response = await login(email, password);
  //     setResponseData(data_response);
  //     console.log(data_response);
  //     console.log(data_response.user.username);
  //     console.log(data_response.user.mail);
  //     setName(data_response.user.username);
  //     setEmail(data_response.user.mail);
  //     setIsLoggedIn(true);
  //     setShowLoginForm(false);
  //   } catch (error) {
  //     console.error("Error registering user:", error);
  //     setResponseData({ message: "Failed to register user" });
  //   }
  // };

  // const handleLogout = () => {
  //   setIsLoggedIn(false);
  // };

  // const handleFavoritesClick = async () => {
  //   try {
  //     const username = user.username;
  //     const response = await fetch(
  //       `http://localhost:5000/api/user/favorites/${username}`,
  //     );

  //     if (response.ok) {
  //       const favorites = await response.json();
  //       console.log("User Favorites:", favorites);
  //       setRecipes(favorites.userFavorites);
  //       setName(username);
  //       setShowFavorites(true);
  //     } else {
  //       console.error("Failed to fetch user favorites:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user favorites:", error);
  //   }
  // };

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

          {/* {isLoggedIn && (
            <div>
              <button
                onClick={handleFavoritesClick}
                className={styles.myFavoritesButton}
              >
                My Favorites
              </button>
              {showFavorites && (
                <FavoritesList username={username} recipes={recipes} />
              )}
            </div>
          )} */}
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
