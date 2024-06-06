//OWNER NEEDS THESE DATA IN APPOINTMENT PAGE
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//take time, date, service from addAppt page
//take company name, address, operating hours, service duration from user.js based on service

const ownerApptSchema = new Schema(
  {
    // serviceId: { type: Schema.Types.ObjectId, ref: "User", required:true },
    service: {type: String},
    ApptTime: { type: String, required: true },
    ApptDate: { type: String, required: true },
    type: { type: String, default: "owner" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OwnerAppt", ownerApptSchema);
