import React, { useState } from "react";
import styles from "../styles/create.module.css";
import { useAuth } from "../AuthContext";

const CreateProfileForm = () => {
  const { registerUser } = useAuth(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password", password);

    try {
      const data = await registerUser(name, email, password);
      setResponseData(data);
      setName("");
      setEmail("");
      setPassword("");
      setRegistrationSuccess(true); 
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
        {registrationSuccess && (
          <div>
            <h3>Thank you for registering with uCook!</h3>
          </div>
        )}
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
