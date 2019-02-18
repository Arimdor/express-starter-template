import * as Redis from "ioredis";

let redis = null;

export default (() => {
    if (redis) {
        return redis;
    }
    redis = new Redis();
    return redis;
})();