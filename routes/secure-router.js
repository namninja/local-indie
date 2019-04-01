const express = require("express");
const passport = require("passport");
const router = express.Router();
//Displays information tailored according to the logged in user
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    //We'll just send back the user details and the token
    console.log(req);
    res.json({
      message: "You made it to the secure route",
      user: req.user,
      token: req.query.secret_token
    });
  }
);

module.exports = router;
