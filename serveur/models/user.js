const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id_fiche:
  {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  slack: { type: Object, default: null },
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: Date.now() },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);