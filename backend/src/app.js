const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');


const app = express();


// Settings
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongolocal:27017/productodb';


// Middlewares
app.use(cors());
app.use(bodyParser.json());


// Routes
app.use('/api/products', productsRoutes);


// Root
app.get('/', (req, res) => res.send('Products API running'));


// Connect DB and start
mongoose.connect(MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
})
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error('Mongo connection error', err);
    process.exit(1);
});