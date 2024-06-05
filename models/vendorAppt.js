const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorApptSchema = new Schema(
  {
    username: { type: Schema.Types.ObjectId, ref: "User", reqiured: true },
    companyName: { type: String },
    address: { type: String },
    service: { type: String },
    type: "vendor",
    openingHoursStart: { type: String },
    openingHoursEnd: { type: String },
    serviceDuration: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vendorAppt", vendorApptSchema);
