const Goal = require('../Model/goalModel')
const User = require('../Model/userModel')

// @desc Get Goals
// @route GET /api/goals
// @access Private
const getGoals = async (req, res)=>{
    try{
        const goals = await Goal.find({user: req.user.id})
        res.status(200).json(goals)
    }
    catch(error){
        throw new Error('There are no goals')
    }
}

// @desc Set Goal
// @route POST /api/goals
// @access Private

const setGoal = async (req, res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    try{
        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        res.status(200).json(goal)
    }
   catch(error){
        throw new Error('OOps!')
   }
}

// @desc Update Goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = async (req, res)=>{
    try{
        const goal = await Goal.findById(req.params.id)
        if(!goal){
            res.status(400)
            throw new Error('Goal Not Found')
        }

        const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found!')
        }

        //Make sure the login user matches the goal user
        if(goal.user.toString()!== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }

        const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        res.status(200).json(updatedGoal)
    }
    catch(error){
        res.status(400)
        throw new Error('Cannot be Updated')
    }
    
}

// @desc Delete Goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = async (req, res)=>{
    console.log('The id to be deleted', req.params.id)
    try{
        const goal = await Goal.findById(req.params.id)
        if(!goal){
            res.status(400)
            throw new Error('The record is not found!')
        }
        else{

            const user = await User.findById(req.user.id)

        if(!user){
            res.status(401)
            throw new Error('User not found!')
        }

        //Make sure the login user matches the goal user
        if(goal.user.toString()!== user.id){
            res.status(401)
            throw new Error('User not authorized')
        }
        
            await goal.deleteOne({id:goal})
            res.status(200).json({id: req.params.id})
        }    
    }
    catch(error){
        res.status(400)
        throw new Error('Oh nooo!', error.text)
    }
}

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
