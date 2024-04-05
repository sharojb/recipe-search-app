import React, { useState } from 'react';
import '../styles/create.module.css';

const CreateProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = process.env.MONGODB_URI || 'mongodb+srv://sharolayn:091188@ucook.oolckyx.mongodb.net/';

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
      });
    console.log('Name:', name);
    console.log('Email:', email);

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
