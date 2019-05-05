require("dotenv").config({ path: "../.env" });
const DATABASE = process.env.DATABASE;
const TEST_DATABASE = process.env.TEST_DATABASE;
const DEVDB = process.env.DEVDB;
const DEVTESTDB = process.env.DEVTESTDB;
const SECRET = process.env.SECRET;

// DATABASE_URL:
//   process.env.DATABASE_URL ||
//   DATABASE,
// TEST_DATABASE_URL:
//   process.env.TEST_DATABASE_URL ||
//   TEST_DATABASE,
const DATABASE_URL = process.env.DATABASE_URL || DATABASE;
const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || TEST_DATABASE;
const PORT = process.env.PORT || 8080;
const JWT_SECRET = SECRET;
const JWT_Expiry = 172800;

module.exports = {
  DATABASE_URL,
  TEST_DATABASE_URL,
  PORT,
  JWT_SECRET,
  JWT_Expiry
};
