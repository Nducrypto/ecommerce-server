import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number },
    color: { type: Array },
    categories: { type: Array },
    size: { type: Array },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("ProductEcommerce", productSchema);

// export default
