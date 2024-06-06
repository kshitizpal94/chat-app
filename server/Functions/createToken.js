const jwt = require('jsonwebtoken');

const createToken= (user)=>{
    const id = user._id;
    const token = jwt.sign({ id },process.env.SECRET_KEY,{expiresIn:2629800000});
    // console.log(token);
    return token;
}

module.exports = createToken;