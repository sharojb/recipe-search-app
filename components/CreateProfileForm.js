import React, { useState } from 'react';
import '../styles/create.module.css';

const CreateProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password', password);

    const response = await fetch(`http://localhost:5000/api/register/${name}/${email}/${password}`);
    const data = await response.json();

    setName('');
    setEmail('');
    setPassword('');
    setResponseData(data); 
  };

  return (
    <div>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
        {responseData && (
          <div>
            <h3>Response from server:</h3>
            <pre>{JSON.stringify(responseData, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateProfileForm;