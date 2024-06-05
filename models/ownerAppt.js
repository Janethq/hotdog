//OWNER NEEDS THESE DATA IN APPOINTMENT PAGE
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//take time, date, service from addAppt page
//take company name, address, operating hours, service duration from user.js based on service

const ownerApptSchema = new Schema(
  {
    service: { type: String, required: true },
    ApptTime: { type: String, required: true },
    ApptDate: { type: String, required: true },
    type: { type: String, default: "owner" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OwnerAppt", ownerApptSchema);
