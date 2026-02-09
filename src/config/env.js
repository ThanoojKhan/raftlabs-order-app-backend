const { cleanEnv, str, port, num } = require("envalid");

module.exports = cleanEnv(process.env, {
    // App config
    NODE_ENV: str({
        choices: ["development", "production", "test"],
        default: "production",
    }),
    MONGODB_URI: str(),
    PORT: port({ default: 3000 }),

    // Order limits
    MAX_QUANTITY_PER_ITEM: num({ default: 10 }),
});