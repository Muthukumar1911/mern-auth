import User from "../models/user.model.js";
import bcryptjs from 'bcrypt'

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
