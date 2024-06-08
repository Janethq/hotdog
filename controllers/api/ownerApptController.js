const debug = require("debug")("mern:controllers:api:usersController");
const OwnerAppt = require("../../models/ownerAppt");

const create = async (req, res) => {
  debug("body: %o", req.body);
  const { serviceId, apptDate, apptTime, userId } = req.body;

  try {
    const ownerAppt = await OwnerAppt.create({
      serviceId,
      apptTime,
      apptDate,
      userId,
    });

    res.status(201).json(ownerAppt);
  } catch (error) {
    debug("error: %o", error);
    res.status(500).json({ error: "New appt for owner not created" });
  }
};

const getAppts = async (req, res) => {
  try {
    const ownerAppts = await OwnerAppt.find({ userId: req.params.id }).populate('userId').populate('serviceId').exec()
    console.log(ownerAppts[0])
    res.json(ownerAppts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAppts = async (req, res) => {
  try {
    const vendorAppts = await OwnerAppt.find({})
      .populate("serviceId")
      .populate("userId")
      .exec();
    console.log(vendorAppts[0]);
    res.json(vendorAppts);
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

const updateAppts = async (req, res) => {
  try {
    const id = req.params.id;
    const ownerAppts = await OwnerAppt.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!ownerAppts) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.send(ownerAppts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating appointment" });
  }
};

const delAppts = async (req, res) => {
  try {
    const id = req.params.id;
    const ownerAppts = await OwnerAppt.findByIdAndDelete(id);
    if (!ownerAppts) {
      return res.status(404).send({ message: "Appointment not found" });
    }
    res.send(ownerAppts);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error deleting appointment" });
  }
};

module.exports = {
  create,
  getAppts,
  isAuthenticated,
  updateAppts,
  delAppts,
  getAllAppts
};
