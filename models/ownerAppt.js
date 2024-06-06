
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerApptSchema = new Schema(
  {
    serviceId: { type: Schema.Types.ObjectId, ref: "User", required:true },
    apptTime: { type: String, required: true },
    apptDate: { type: String, required: true },
    type: { type: String, default: "owner" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("OwnerAppt", ownerApptSchema);
