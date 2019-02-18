import * as dotenv from "dotenv";

dotenv.config();
import * as express from "express";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as helmet from "helmet";
import * as path from "path";
import * as logger from "morgan";
import * as passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as BearerStrategy} from "passport-http-bearer";
import * as Auth from "./config/auth";
import apiRoute from "./routes/api"

const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", apiRoute);
app.use(passport.initialize());
passport.use(new BearerStrategy(async (token, done) => {
    await Auth.bearerStrategy(token, done);
}));
passport.use(new LocalStrategy(async (email, password, done) => {
    await Auth.localStrategy(email, password, done);
}));

const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
    console.log(`Iniciando en el puerto ${port}`);
});
