const express = require("express");
const router = express.Router();
const ownerApptCtrl = require("../../controllers/api/ownerApptController");
// const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/owner
router.post("/newappt", ownerApptCtrl.create);
// gets all appointments
router.get("/allappts", ownerApptCtrl.getAllAppts);
// gets all appointments for a specific owner
router.get("/appts/:id", ownerApptCtrl.getAppts);
// gets all appointments for a specific vendor
router.get("/vendorappts/:id", ownerApptCtrl.getVendorAppts);
router.patch("/appts/:id", ownerApptCtrl.updateAppts);
router.delete("/appts/:id", ownerApptCtrl.delAppts);

module.exports = router;
