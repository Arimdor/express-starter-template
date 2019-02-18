import * as User from "../app/models/user";
import * as Bearer from "../app/models/bearer";
import * as uuid from "uuid/v4";

export async function bearerStrategy(token, done) {
    try {
        const bearer = await User.findByBearer(token);
        if (!bearer) {
            return done(null, false);
        }
        return done(null, bearer);
    } catch (e) {
        return done(e);
    }
}

export async function localStrategy(email, password, done) {
    try {
        const user = await User.findByEmail(email);
        if (!user) {
            return done(null, false, {message: 'Incorrect username.'});
        }
        if (await User.validatePassword(password, user)) {
            return done(null, user);
        }
        return done(null, false, {message: 'Incorrect password.'});
    } catch (e) {
        return done(e);
    }
}

export async function generateBearerToken(userID) {
    try {
        const token = uuid();
        await Bearer.insertBearerToken(userID, token);
        return token
    } catch (e) {
        throw Error(e);
    }
}
