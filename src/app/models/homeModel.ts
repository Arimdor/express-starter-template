import * as DB from "../../config/database";

export class HomeModel {
    public static async getDemoInfo() {
        const [result] = await DB.execute("select * from users");
        return result;
    }
}
