const mongoose = require("mongoose");
const shipdataSchema = new mongoose.Schema({
  userid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
  },
});
const Shipdata = mongoose.model("SHIPPPINGADDRESS", shipdataSchema);
module.exports = Shipdata;
