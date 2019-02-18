import {DB, getFirst} from "../../config/database";
import redis from "../../config/redis";
import * as bcrypt from "bcrypt";

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

export async function validatePassword(password, hashedPassword) {
    try {
        return await bcrypt.compare(password, hashedPassword)
    } catch (e) {
        throw Error(e);
    }
}

export async function insert(firstName, lastName, email, password, phone, photo_url) {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        return getFirst(await DB.execute("insert into users (first_name, last_name, email, bcrypt(password, phone, photo_url" +
            "values (?, ?, ?, ?, ?, ?)", [firstName, lastName, email, hashedPassword, phone, photo_url]));
    } catch (e) {
        throw Error(e);
    }
}
