const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true,
    },
    dogName: { type: String },
    breed: { type: String },
    weight: { type: Number },
    companyName: { type: String },
    address: { type: String },
    service: { type: String },
    type: { type: String },
    openingHoursStart: { type: String },
    openingHoursEnd: { type: String },
    serviceDuration: { type: Number , min: 1, },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

//middleware to set the user type based on what fields I have
userSchema.pre("save", function (next) {
  if (this.dogName && this.breed && this.weight) {
    this.type = "owner";
  } else if (this.companyName && this.address && this.service && this.openingHoursStart && this.openingHoursEnd && this.serviceDuration) {
    this.type = "vendor";
  }
  next();
});


userSchema.pre("save", async function (next) {
  // 'this' is the user doc
  if (!this.isModified("password")) return next();
  // update the password with the computed hash
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);
