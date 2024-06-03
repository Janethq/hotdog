
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownerApptSchema = new Schema(
  {
    username: { type: Schema.Types.ObjectId, ref: "User", reqiured: true },
    dogName: { type: String },
    breed: { type: String },
    weight: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ownerAppt", ownerApptSchema);
