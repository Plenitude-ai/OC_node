const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();


// const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user.js');


// connection to MONGODB
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD
mongoose.connect("mongodb+srv://new_user:"+MONGO_DB_PASSWORD+"@plenitudeai-cluster.ba3nq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//  CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//   PARSING REQUEST
app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;