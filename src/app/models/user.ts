import {DB, getFirst} from "../../config/database";
import redis from "../../config/redis";

export async function findByBearer(bearer) {
    try {
        const result = await redis.get('bearer:' + bearer);
        if (result == null) {
            return null;
        }
        return result;
    } catch (e) {
        throw Error(e);
    }
}

export async function findByEmail(email) {
    try {
        return getFirst(await DB.execute("select * from users where email = ?", [email]));
    } catch (e) {
        throw Error(e);
    }
}

export async function validatePassword(password, user) {
    return password == user['password'];
}
