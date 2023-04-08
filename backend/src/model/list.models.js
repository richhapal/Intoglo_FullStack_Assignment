const mongoose = require("mongoose");
const validator = require("validator");

const ListSchema = new mongoose.Schema(
     {
          name: { type: String, minlength: 5 },
          assignTo: { type: String, default: "admin" },
          amount: { type: Number, min: 0, max: 3000, require: true },
          status: { type: String, default: "Pending" },
          date: { type: Date },
          email: { type: String, require: true, validate: (email) => validator.isEmail(email) },
          comment: { type: String, default: "" },
     },
     { timestamps: true }
);

const ListModel = mongoose.model("List", ListSchema);

// ListSchema.statics.

module.exports = { ListModel };
