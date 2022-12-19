import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, uniques: true },
    product: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("CartEcommerce", cartSchema);
