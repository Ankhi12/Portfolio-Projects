const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../Model/userModel')

//@desc Register new User
//@route POST /api/users
//@access Public

const registerUser = async (req, res)=>{
    const {name, email, password} = req.body
   
        if(name === '' || name === null|| email === null || email === ''|| password === null || password === ''){
            res.status(400)
            throw new Error('Please add all fields')
        }

        try{
            //Check if users exists
            const userExists = await User.findOne({email})
          
            if(userExists){
                res.status(400)
                throw new Error('User already exists')
            }
        }
        catch(error){
            res.status(400)
            throw new Error('Error at user exists')
        }
        
        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        try{
            //create User
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
            })

            if(user){
                res.status(201).json({
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                })
            }
            else{
                res.status(400)
                throw new Error('Invalid User Data!')
            }
        }
        catch(error){
            res.status(400)
            throw new Error('Error in creating a user!')
        }
}

//@desc Login a User
//@route POST /api/users/login
//@access Public
const loginUser = async (req, res)=>{

    const {email, password} = req.body
    //Check for User Email
    try{
    const user = await User.findOne({email})
        if(user.email && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
        else{
            res.status(400)
            throw new Error('Invalid Crendentials!')
        }
    }
    catch(error){
        res.status(400)
        throw new Error('Hmm...Something is wrong here! Please Contact the Web Admin!')
    }
    
    
}

//@desc Get User Data
//@route GET /api/users/me
//@access Private
const getMe = async (req, res)=>{
    try{
        const{_id, email, name} = await User.findById(req.user.id)
        res.status(200)
        res.json({
            id:_id,
            name,
            email,
        })
    } 
    catch(error){
        res.status(400)
        throw new Error('Error while displaying user details! Contact the website Admin.')
    }
}

//Generate Token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}
