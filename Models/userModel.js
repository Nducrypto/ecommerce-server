import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("UserEcommerce", userSchema);

// export default
