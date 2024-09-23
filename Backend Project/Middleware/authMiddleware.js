const jwt = require('jsonwebtoken')
const User = require('../Model/userModel')

const protect = async (req, res, next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //Get Token From Header
            token = req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        }
        catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, No Token')
    }
}

module.exports = {
    protect,
}
