import redis from "../../config/redis";

export async function insertBearerToken(userID: number, token) {
    try {
        await redis.set('bearer:' + token, {user_id: userID, token: token}, 'ex', 86400);
    } catch (e) {
        throw Error(e);
    }
}