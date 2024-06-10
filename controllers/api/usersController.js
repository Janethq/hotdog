const debug = require("debug")("mern:controllers:api:usersController");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { getUser } = require("../../config/checkToken");

const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "20m" });

const create = async (req, res) => {
  debug("body: %o", req.body);
  const {
    name,
    password,
    companyName,
    service,
    address,
    username,
    dogName,
    breed,
    weight,
    openingHoursStart,
    openingHoursEnd,
    serviceDuration,
  } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const user = await User.create({
      name,
      password,
      companyName,
      service,
      address,
      username,
      dogName,
      breed,
      weight,
      openingHoursStart,
      openingHoursEnd,
      serviceDuration,
    });
    debug("user: %o", user);
    const token = createJWT(user);
    res.status(201).json(token);
  } catch (error) {
    debug("error: %o", error);
    res.status(500).json({ error });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user === null) {
    res.status(401).json({ msg: "User not found" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const token = createJWT(user);
    res.json(token);
  } else {
    res.status(401).json({ msg: "Password incorrect" });
  }
};

const checkToken = (req, res) => {
  const user = getUser(req, res); //res.locals.user;
  res.json({ user });
};

const readByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const update = async (req, res) => {
  const username = req.params.username;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate({ username }, updates, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAllServices = async (req, res) => {
  try {
    const users = await User.find({}); // Fetch all users
    let services = [];
    users.forEach((user) => {
      if (user.service) {
        // Check if the user has a service
        const responseObj = {
          serviceName: user.service,
          serviceId: user._id,
          servicesStartHr: user.openingHoursStart,
          servicesEndHr: user.openingHoursEnd,
          serviceTime: user.serviceDuration,
        };
        services.push(responseObj); // Push the service to the array
      }
    });
    // Remove duplicate services
    services = Array.from(new Set(services));
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  create,
  login,
  checkToken,
  readByUsername,
  update,
  getAllServices,
};
