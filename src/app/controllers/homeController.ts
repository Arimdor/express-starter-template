import {HomeModel} from "../models/homeModel";

export class HomeController {
    public static async index(req, res) {
        const info = await HomeModel.getDemoInfo();
        res.render("index", {messages: info});
    }

    public static async indexJSON(req, res) {
        const info = await HomeModel.getDemoInfo();
        res.json({title: "Arimdor's Template", messages: JSON.stringify(info)});
    }
}
