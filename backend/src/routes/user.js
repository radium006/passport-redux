import express from 'express'
import User from '../models/user'
import { signUp } from '../validations/user'
import { parseError, sessionizeUser } from "../util/helpers";

const userRoutes = express.Router();

userRoutes.post("", async (req, res) => {
    console.log(req.body)
    try {
        
        const { username, email, password } = req.body
        
        await signUp.validate({username, email, password})
        console.log(username)
        const newUser = new User({username, email, password});
        const sessionUser = sessionizeUser(newUser)  
        await newUser.save();

        req.session.user = sessionUser
        console.log(req.session)
        res.send(sessionUser)
    } catch(e) {
        console.log(e)
        res.status(400).send(parseError(err))
    }
})

export default userRoutes