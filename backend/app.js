const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


const Thing = require('./models/Thing');


// connection to MONGODB
mongoose.connect("mongodb+srv://new_user:2TU7DrbhTTATnKpu@plenitudeai-cluster.ba3nq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));





// MIDDLEWARE


//  CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//   PARSING REQUEST
app.use(bodyParser.json());

// POST REQUESTS
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({ ...req.body });
    thing.save()
      .then( () => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });


// GET requests
app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

// GET ALL REQUESTS
app.get('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  });


app.put("/api/stuff/:id", (req, res, next) => {
    Thing.updateOne({ _id : req.params.id }, {...req.body, _id:req.params.id })
        .then( () => res.status(201).json({message : "Updated !"}))
        .catch(error => res.status(400).json({ error }))
})

app.delete("/api/stuff/:id", (req, res, next) =>{
    Thing.deleteOne({ _id : req.params.id})
        .then( () => res.status(201).json({message : "object deleted !"}))
        .catch(error => res.status(400).json({ error }) )
})







// app.get("/api/stuff/:id", (req, res, next) => {
//     Thing.findOne({ _id : req.params.id })
//         .then(thing => res.status_code(200).json(thing))
//         .catch(error => res.status_code(404).json({ error }))
// })




module.exports = app;