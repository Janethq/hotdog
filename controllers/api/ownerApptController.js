const debug = require("debug")("mern:controllers:api:usersController");
const OwnerAppt = require("../../models/ownerAppt");

const create = async (req, res) => {
  debug("body: %o", req.body);
  const { service, ApptDate, ApptTime, userId } = req.body;

  try {
    const ownerAppt = await OwnerAppt.create({
      service,
      ApptTime,
      ApptDate,
      userId,
    });

    res.status(201).json(ownerAppt);
  } catch (error) {
    debug("error: %o", error);
    res.status(500).json({ error: "New appt for owner not created" });
  }
};

const getAppts = async (req, res) => {
  console.log(req.params)
  try {
    const ownerAppts = await OwnerAppt.find({ userId: req.params.id });
    res.json(ownerAppts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = {
  create,
  getAppts,
  isAuthenticated,
};
