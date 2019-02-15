import {User} from "../models/User";

export class PassportStrategies {
    public static async bearerStrategy(token, done) {
        try {
            const user = await User.findByToken(token);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (e) {
            return done(e);
        }
    }
}
