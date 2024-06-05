const debug = require("debug")("mern:controllers:api:usersController");
const OwnerAppt = require("../../models/ownerAppt");

const create = async (req, res) => {
  debug("body: %o", req.body);
  const { service, ApptDate, ApptTime } = req.body;

  try {
    const ownerAppt = await OwnerAppt.create({
      service,
      ApptTime,
      ApptDate,
    });

    res.status(201).json(ownerAppt);
  } catch (error) {
    debug("error: %o", error);
    res.status(500).json({ error: "New appt for owner not created" });
  }
};


module.exports = {
  create,
};
