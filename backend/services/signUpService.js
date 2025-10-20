import bcrypt from "bcrypt";
import {testUsers, saltRounds} from "../utils/testUsers.js";


export async function signUpController(req, res) {
    const {email, password} = req.body;

    if(!email || !password)return res.status(400).json({error: "Please fill in all fields"});

    const userExists = testUsers.find(u => u.email === email);
    if(userExists) return res.status(409).json({error: "User already exists"});

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
        id:testUsers.length + 1,
        email:email,
        password:hashedPassword,
        role: "user",
        mfaSecret:null
    }

    testUsers.push(newUser);

    console.log("New User Created for ", email)

    return res.json({message: "User Created. Please Log In"})
}