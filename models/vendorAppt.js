const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorApptSchema = new Schema(
  {
    username: { type: Schema.Types.ObjectId, ref: "User", reqiured: true },
    companyName: { type: String },
    address: { type: String },
    service: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vendorAppt", vendorApptSchema);
