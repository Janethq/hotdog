const express = require("express");
const router = express.Router();
const ownerApptCtrl = require("../../controllers/api/ownerApptController");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/owner
router.post("/newappt", ownerApptCtrl.create);

module.exports = router;
