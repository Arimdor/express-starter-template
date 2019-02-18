import {generateBearerToken} from "../../config/auth";
import * as passport from "passport";

export function login(req, res, next) {
    passport.authenticate('local', {session: false}, async function (err, user, info) {
        try {
            if (err) {
                next(err);
                return;
            }
            if (user) {
                await generateBearerToken(user.id);
                res.json(user);
            } else {
                res.status(401).send('Bad Login');
            }
        } catch (e) {
            return next(e);
        }
    })(req, res, next);
}

export async function register(req, res, next) {

}

export const authenticated = (passport.authenticate("bearer", {session: false}));