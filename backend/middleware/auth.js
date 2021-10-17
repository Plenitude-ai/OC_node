const jwt = require('jsonwebtoken');


require('dotenv').config();
const JWT_SECRET_KEY=process.env.JWT_SECRET_KEY;


module.exports = (req, res, next) => {
    try {
        console.log("\nAuth...");
        console.log("JWT_SECRET_KEY : ", JWT_SECRET_KEY);
        console.log("req.headers.authorization : ", req.headers.authorization);
        token = req.headers.authorization.split(" ")[1];
        decodedToken = jwt.verify(token, JWT_SECRET_KEY)
        console.log('decodedToken : ', decodedToken);
        console.log('req.body.userId : ', req.body.userId);
        console.log('decodedToken.userId: ', decodedToken.userId);
        console.log(req.body.userId == req.body.userId);
        if (req.body.userId && decodedToken.userId != req.body.userId) {
            console.log('WRONG uSER !!!!!');
            throw "invalid user ID";
            // return res.status(401).json({ error: "unauthorized !"})
        } else {
            console.log('NEXT !');
            next();
        }
    } catch {
        console.log('ERROR ...');
        res.status(401).json({ error: new Error('Invalid request!') });
    }

}