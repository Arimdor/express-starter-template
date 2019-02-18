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

export async function localStrategy(username, password, done) {
    try {
        const user = await User.findByEmail(username);
        if (user == null) {
            console.log('bad user');
            return done(null, false);
        }
        if (!await User.validatePassword(password, user.password)) {
            console.log('bad pass');
            return done(null, false);
        }
        console.log('g1');
        return done(null, user);
    } catch (e) {
        console.log(e);
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
