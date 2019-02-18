import {generateBearerToken} from "../../config/auth";
import * as passport from "passport";

export function login(req, res, next, passport) {
    passport.authenticate('local', {session: false}, async function (err, user, info) {
        try {
            await generateBearerToken(user['id']);
            res.json(user);
        } catch (e) {
            return next(e);
        }
    })(req, res, next);
}

export const authenticated = (passport.authenticate("bearer", {session: false}));