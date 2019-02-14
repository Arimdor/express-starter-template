import {Router} from "express";
import {HomeController} from "../app/controllers/homeController";

const router = Router();

router.get("/", HomeController.indexJSON);

export default router;
