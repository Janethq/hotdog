const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersController");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/users
router.post("/", usersCtrl.create);
router.post("/login", usersCtrl.login);
router.get("/services", usersCtrl.getAllServices); 
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
router.get("/:username", usersCtrl.readByUsername);
router.patch("/:username", usersCtrl.update);

module.exports = router;
