import express from 'express';
import {loginController, verifyMfaController} from "../services/authService.js";
import {signUpController} from "../services/signUpService.js";
import {deleteUserController, getAllUsersController} from "../services/adminService.js"

const router = express.Router();

router.post("/login", loginController);
router.post("/mfa", verifyMfaController);
router.post("/signup", signUpController)
router.get("/users", getAllUsersController);
router.delete("/users/:id", deleteUserController);

export default router;