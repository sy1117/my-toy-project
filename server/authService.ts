import jwt from 'jsonwebtoken';


// check if Token exists on request Header and attach token to request as attribute
export const checkTokenMW = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        req.jwt = bearerHeader.split(' ')[1];
        next();
    } else {
        res.sendStatus(403);
    }
};

// Verify Token validity and attach token data as request attribute
export const verifyToken = (req, res) => {
    jwt.verify(req.jwt, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            return req.authData = authData;
        }
    })
};

// 
// export const destroyToken = (req, res) => {
//     // jwt.destroy(req.jwt)
//     // jwt.expiresIn(0);
//     return true;
// };

// Issue Token
export const signToken = async (req, res) => {
    let token = jwt.sign({userId: req.user.id}, 'secretkey', {expiresIn:'20 min'})
    return token;
}