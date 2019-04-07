require("dotenv").config({ path: __dirname + "/.env" });
const DATABASE = process.env.DATABASE;
const TEST_DATABASE = process.env.TEST_DATABASE;
const SECRET = process.env.SECRET;

module.exports = {
  // DATABASE_URL:
  //   process.env.DATABASE_URL ||
  //   DATABASE,
  // TEST_DATABASE_URL:
  //   process.env.TEST_DATABASE_URL ||
  //   TEST_DATABASE,
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost/local-indie",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL || "mongodb://localhost/test-local-indie",
  PORT: process.env.PORT || 8080,
  JWT_SECRET: SECRET,
  JWT_Expiry: 172800
};
