import React, { useState, useContext } from "react";
import styles from "../styles/create.module.css";
import { AuthContext } from "../AuthContext"; 

const CreateProfileForm = () => {
  const { registerUser } = useContext(AuthContext); // Access context functions

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password", password);

    try {
      const data = await registerUser(name, email, password); // Call context function to register user
      setResponseData(data);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
      setResponseData({ message: "Failed to register user" });
    }
  };

  return (
    <div>
      <h2 className={styles.createProfileTitle}>Create Your Profile</h2>
      <form className={styles.createContainer} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label className={styles.create}>Name</label>
          <input
            className={styles.inputCreate}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.create}>Email</label>
          <input
            className={styles.inputCreate}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.create}>Password</label>
          <input
            className={styles.inputCreate}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className={styles.createSubmit}>
          Submit
        </button>
        {responseData && (
          <div>
            <h3>Response from server:</h3>
            <pre className={styles.return}>{responseData.message}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProfileForm;
