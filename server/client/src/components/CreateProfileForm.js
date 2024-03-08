import React, { useState } from 'react';
import '../../styles/create-profile-form.css';

const CreateProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Example: Perform actions with name and email data (e.g., send to server)
    console.log('Name:', name);
    console.log('Email:', email);

    // Reset the form after submission
    setName('');
    setEmail('');
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProfileForm;
