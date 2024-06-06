const express = require("express");
const router = express.Router();
const ownerApptCtrl = require("../../controllers/api/ownerApptController");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/owner
router.post("/newappt", ownerApptCtrl.create);

// gets all appointments for a specific owner
router.get("/appts/:id", ownerApptCtrl.getAppts);

module.exports = router;
