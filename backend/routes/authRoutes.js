import express from 'express';
import {loginController, verifyMfaController} from "../services/authService.js";
import {signUpController} from "../services/signUpService.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/mfa", verifyMfaController);
router.post("/signup", signUpController)

export default router;