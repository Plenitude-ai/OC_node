const bcrypt = require("bcrypt");
const User = require("../models/user.js")



exports.signup = (req, res, next) => {

    console.log("\nsignup ...")
    console.log("Password : ", req.body.password);
    bcrypt.hash(req.body.password, 10)
        .then( hash => {const user = new User({ email: req.body.email,
                                                password: hash});
                        console.log("user : ", user);
                        user.save()
                            .then( () => { console.log("POST succes !")
                                            res.status(201).json({ message : "user signed up !"})
                                        }
                            )
                            .catch( error => { console.log( error );
                                                res.status(400).json({ error })
                                            }
                            );
                        
                        }
        )
        .catch(error => {console.log(error);
                        res.status(500).json({ error })
                        }
        )

};

exports.login = (req, res, next) => {

};