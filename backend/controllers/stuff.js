const fs = require('fs');
const Thing = require('../models/thing.js');



exports.createThing = (req, res, next) => {
    console.log('createThing...');
    thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    const thing = new Thing({...thingObject,
                             imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                            });
    thing.save()
        .then( () => { res.status(201).json({ message: 'Post saved successfully!' }); })
        .catch( (error) => { res.status(400).json({ error: error }); });
};

exports.getOneThing = (req, res, next) => {
    console.log('getOneThing...');
    Thing.findOne({ _id: req.params.id })
        .then( (thing) => { res.status(200).json(thing); })
        .catch( (error) => { res.status(404).json({ error: error }); });
};

exports.modifyThing = (req, res, next) => {
    console.log('modifyThing...');
    const thingObject = req.file ? { ...JSON.parse(req.body.thing), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
                                 : { ...req.body };
    Thing.updateOne({_id: req.params.id}, thingObject)
        .then( () => { res.status(201).json({ message: 'Thing updated successfully!' }); })
        .catch( (error) => {console.log(error);
                            res.status(400).json({ error: error });
                            });
};

exports.deleteThing = (req, res, next) => {
    console.log('deleteThing...');
    Thing.findOne({ _id: req.params.id })
        .then( thing => {const filename = thing.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => Thing.deleteOne({_id: req.params.id})
                                                                .then( () => { res.status(200).json({ message: 'Deleted!' }); })
                                                                .catch( (error) => { res.status(400).json({ error: error }); })
                                )
                        }
        )
        .catch( error => {console.log('error : ', error);
                            res.satus(500).json({ error });
                        });
};

exports.getAllStuff = (req, res, next) => {
    console.log('getAllStuff...');
    Thing.find()
        .then( (things) => { res.status(200).json(things); })
        .catch( (error) => { res.status(400).json({ error: error }); });
};