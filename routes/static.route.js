const express = require("express");
const router = express.Router();
const {homepage, signup_page, login_page} = require("../controllers/static.controller");
const {authMiddleware} = require("../middlewares/auth.middleware");

router.get("/", authMiddleware, homepage);
router.get("/signup", signup_page);
router.get("/login", login_page);

module.exports = router;