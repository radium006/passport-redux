
import express from 'express'
import User from '../models/user'
import { signUp } from '../validations/user'

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    console.log(req.body)
    try {
        
        const { username, email, password } = req.body
        
        await signUp.validate({username, email, password})
        console.log(username)
        const newUser = new User({username, email, password});
        
        await newUser.save();
        res.send({userId: newUser.id, username})
    } catch(e) {
        console.log(e)
        res.send(e)
    }
})

export default userRoutes