const validator = require("validator");

const validateSignup = (req, res, next) => {
  try {
    let {
      name,
      username,
      password,
      phone_number,
      gender,
      date_of_birth,
      address,
    } = req.body;

    // Check if all fields are provided
    if (!name || !username || !password || !phone_number || !gender || !date_of_birth || !address) {
      throw new Error("Please provide all fields");
    }

    // Check if address fields exist
    if (!address.street || !address.city || !address.zipCode) {
      throw new Error("Incomplete address");
    }

    // Trim and clean data
    name = name.trim();
    username = username.trim();
    phone_number = phone_number.trim();
    gender = gender.trim();
    address.street = address.street.trim();
    address.city = address.city.trim();
    address.zipCode = address.zipCode.trim();

    // Validate name (letters, spaces, hyphens, apostrophes)
    const nameValidator = /^[a-zA-ZäöåÄÖÅ]+(?:[ '-][a-zA-ZäöåÄÖÅ]+)*$/;
    if (!nameValidator.test(name)) {
      throw new Error("Invalid name format");
    }

    // Validate username (alphanumeric, 3-20 characters)
    if (!validator.isLength(username, { min: 3, max: 20 })) {
      throw new Error("Username must be between 3 and 20 characters");
    }

    const usernameValidator = /^[a-zA-Z0-9_]+$/;
    if (!usernameValidator.test(username)) {
      throw new Error("Username must contain only letters, numbers, and underscores");
    }

    // Validate password strength
    if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough");
    }

    // Validate phone number
    const cleanPhone = phone_number.replace(/[\s\-\(\)]/g, "");
    if (!validator.isMobilePhone(cleanPhone, "any", { strictMode: false })) {
      throw new Error("Invalid phone number");
    }

    // Validate gender
    const validGenders = ["Male", "Female", "Other", "male", "female", "other"];
    if (!validGenders.includes(gender)) {
      throw new Error("Gender must be Male, Female, or Other");
    }

    // Validate date of birth
    if (isNaN(Date.parse(date_of_birth))) {
      throw new Error("Invalid date format");
    }

    const dob = new Date(date_of_birth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (age < 13) {
      throw new Error("You must be at least 13 years old to register");
    }

    if (age > 120) {
      throw new Error("Invalid date of birth");
    }

    // Validate address fields
    const addressValidator = /^[a-zA-ZäöåÄÖÅ0-9.,'/#() -]+$/;
    if (!addressValidator.test(address.street)) {
      throw new Error("Invalid street format");
    }

    if (!addressValidator.test(address.city)) {
      throw new Error("Invalid city format");
    }

    if (!/^\d{5}$/.test(address.zipCode)) {
      throw new Error("Invalid postal code");
    }

    // Attach cleaned data to req
    req.body.name = name;
    req.body.username = username;
    req.body.phone_number = phone_number;
    req.body.gender = gender;
    req.body.address = address;

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const validateLogin = (req, res, next) => {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      throw new Error("Both fields must be filled");
    }

    username = username.trim();
    req.body.username = username;

    next();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { validateSignup, validateLogin };
