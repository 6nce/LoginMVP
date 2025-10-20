import bcrypt from 'bcrypt';
import {testUsers} from "../utils/testUsers.js";
import {generateMfaSecret, verifyMfaToken} from "./mfaService.js";
import speakeasy from "speakeasy";

export async function loginController(req, res) {
    const {email, password} = req.body;

    if(!email || !password)return res.status(400).json({error: "Please fill in all fields"});

    const user = testUsers.find(u => u.email === email);
    if(!user) return res.status(404).json({error: "User not found"});

    const validLogin = await bcrypt.compare(password, user.password);
    if(!validLogin) return res.status(401).json({error: "Invalid login"});

    const{ secret, otpAuthUrl} = generateMfaSecret();
    user.mfaSecret = secret;

    const testToken = speakeasy.totp({secret, encoding: "base32"});
    console.log("Token for Testing:", testToken);

    return res.json({message: "Success, Please validate login", otpAuthUrl})
}

export function verifyMfaController(req, res) {
    const {email, token} = req.body;
    const user = testUsers.find(u => u.email === email);
    if(!user || !user.mfaSecret) return res.status(401).json({error: "Invalid login"});

    const valid = verifyMfaToken(user.mfaSecret, token);
    if (!valid) return res.status(401).json({error: "Invalid login"});

    return res.json({message: "MFA Verified", accessGranted: true});
}