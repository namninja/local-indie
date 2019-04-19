const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require("../models/user");

function validateRegisterInput(data) {
  // Instantiate our errors object
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.profileName = !isEmpty(data.profileName) ? data.profileName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Check for empty fields, valid email formats, password requirements and confirm
  // password equality using validator functions

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  } else if (User.findOne({ email: data.email }) === undefined) {
    errors.email = "Email already exists";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Return our errors object with any and all errors contained as well as an
  // isValid boolean that checks to see if we have any errors

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

module.exports = validateRegisterInput;
