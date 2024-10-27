const express = require('express');
const router = express.Router();
const User=require('../models/usermodel');

// Route to register a new user
router.post('/register', async (req, res) => {
    const { name, age, gender, email, password, phone, address } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      user = new User({
        name,
        age,
        gender,
        email,
        password,
        phone,
        address
      });
  
      // Save the user
      await user.save();
      res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
});  

// Route to login a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check the password (for simplicity, compare directly)
      if (password !== user.password) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      res.status(200).json({ msg: 'User logged in successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Route to get a user's profile
router.get('/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-password');
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  module.exports = router;