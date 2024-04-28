import bcrypt from 'bcrypt';
import dbConnect from '../../backend/config/db';
import User from '../../backend/models/User';

export default async function handler(req, res) {
  await dbConnect();
  console.log('Connected to DB');

  if (req.method === 'POST') {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}