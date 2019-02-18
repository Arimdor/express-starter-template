import {Router} from "express";
import * as UserController from "../app/controllers/userController";
import * as Auth from "../app/controllers/authController";

const router = Router();

router.post('/login', Auth.login);
router.get("/", Auth.authenticated, UserController.helloWorld);

export default router;