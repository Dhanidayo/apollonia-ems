require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || "9091",
    MONGO_URI: process.env.MONGO_URI || "",
    STATIC_ACCESS_TOKEN: process.env.STATIC_ACCESS_TOKEN
};
