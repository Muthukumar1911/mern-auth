import User from "../models/user.model.js";
import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const {username, password, email} = req.body;
    console.log(req.body)
    // Check if the password is empty
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({username, password: hashedPassword, email});
        await newUser.save();
        res.status(201).json("User created successfully!");
    } catch(err) {
        res.status(500).json(err);
    }
};


export const signin = async (req, res, next) => {
    const {email, password} = req.body
    console.log(req.body)
    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(401, 'User not found'))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(401, 'Wrong credentials'))
        }
        const token = jwt.sign({id : validUser._id}, process.env.JWT_SECRET)
        const {password : hashedPassword, ...rest} = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000)
        res.cookie('access_token', token, {httpOnly : true, expires: expiryDate}).status(200).json(rest)
    } catch (error) {
        next(error)
    }
}