const express = require("express");
const { signupUser, loginUser, getMe } = require("../controllers/userController");
const { validateSignup, validateLogin } = require("../middleware/validateMiddleware");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/signup", validateSignup, signupUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", requireAuth, getMe);

module.exports = router;