const express = require('express');
const multer = require('multer');
const Product = require('../models/productmodel');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to create a new product
router.post('/products', upload.single('image'), async (req, res) => {
  const { name, description, startingBid, deadline } = req.body;
  const imagePath = req.file.path; // Path of the uploaded image

  try {
    const newProduct = new Product({
      name,
      description,
      startingBid,
      deadline,
      image: imagePath,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).send('Server error');
  }
});
// Route to get all products
router.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
