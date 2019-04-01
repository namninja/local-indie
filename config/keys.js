module.exports = {
  // DATABASE_URL:
  //   process.env.DATABASE_URL ||
  //   "mongodb+srv://zero-admin:zero-admin@cluster0-pfvwv.mongodb.net/local-indie?retryWrites=true",
  // TEST_DATABASE_URL:
  //   process.env.TEST_DATABASE_URL ||
  //   "mongodb+srv://zero-admin:zero-admin@cluster0-pfvwv.mongodb.net/test-local-indie?retryWrites=true",
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost/local-indie",
  TEST_DATABASE_URL:
    process.env.TEST_DATABASE_URL || "mongodb://localhost/test-local-indie",
  PORT: process.env.PORT || 8080,
  JWT_SECRET: "wutangclanaintnothingtofuckwith",
  JWT_Expiry: 172800
};
