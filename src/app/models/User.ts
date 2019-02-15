import * as DB from "../../config/database";
import {getFirst} from "../utils/Arrays";

export class User {

    public static async findByToken(token) {
        try {
            return getFirst(await DB.execute("select * from users u inner join user_tokens ut on u.id = ut.user_id " +
                "where ut.token = ? limit 1", [token]));
        } catch (e) {
            throw Error(e);
        }
    }
}
