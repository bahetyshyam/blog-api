import express from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import { registerValidation, loginValidation } from '../validation';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/register', async (req, res) => {

    //User Validation
    const {error} = registerValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);  
    }

    //Check if user already exists
    const emailExist = await User.findOne({email : req.body.email});
    if(emailExist) {
        res.status(400).send('Email Already Exists');
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
 
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //User Validation
    const {error} = loginValidation(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);  
    }

    //Check if user already exists
    const user = await User.findOne({email : req.body.email});
    if(!user) {
        return res.status(400).send('Email Not Found');
    }

    const validPass = bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        return res.status(400).send("Incorrect Password");
    }

    //Assign Token
    const token = jwt.sign({_id : user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token);
})


export default router;