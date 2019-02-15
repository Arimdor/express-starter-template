import {Router} from "express";
import * as passport from "passport";
import {HomeController} from "../app/controllers/homeController";

const router = Router();

router.get("/", passport.authenticate("bearer", { session: false }), HomeController.indexJSON);

export default router;
