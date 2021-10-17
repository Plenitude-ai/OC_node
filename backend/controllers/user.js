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
    console.log("\nLogin...")
    User.findOne({email: req.body.email})
        .then(user =>{ if (!user) {
                            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
                        }
                        console.log("User found : ", user);
                        console.log("Entered password : ", req.body.password);
                         bcrypt.compare(req.body.password, user.password)
                            .then( valid => { console.log(" valid : ", valid );
                                            if (!valid) {
                                                console.log(" valid is FALSE !!!");
                                                return res.status(401).json({ error:"Unauthorized !!!" });
                                                }
                                            console.log("VALIDE !!!")
                                            res.status(200).json({  userId:user._id,
                                                                    token: "TOKEN"})
                                            }
                            )
                            .catch( error => {console.log(error);
                                                res.status(500).json({ error });
                                            }
                            )
                        }
        )

};