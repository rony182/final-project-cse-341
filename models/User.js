const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");
const UserSchema = Schema({
  firstName: {
    type: String,
    required: [true, "Fierst Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  birthday: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, password, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

module.exports = mongoose.models.User || model("User", UserSchema);
