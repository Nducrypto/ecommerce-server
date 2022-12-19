import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true, uniques: true },
    description: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    color: { type: Array },
    categories: { type: Array },
    size: { type: Array },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("ProductEcommerce", productSchema);

// export default
