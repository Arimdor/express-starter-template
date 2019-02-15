import * as dotenv from "dotenv";

dotenv.config();
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as Redis from "ioredis";
import * as logger from "morgan";
import * as passport from "passport";
import {Strategy as BearerStrategy} from "passport-http-bearer";
import * as path from "path";

import {PassportStrategies} from "./app/services/PassportStrategies";
import apiRouter from "./routes/api";

const redis = new Redis();
const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", apiRouter);
passport.use(new BearerStrategy((token, done) => {
    PassportStrategies.bearerStrategy(token, done);
}));

const port = process.env.APP_PORT || 8080;
app.listen(port, () => {
    console.log(`Iniciando en el puerto ${port}`);
});
