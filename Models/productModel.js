import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    price: { type: Number },
    color: { type: Array },
    categories: { type: String },
    size: { type: Array },
    rating: { type: Number, min: 1, max: 5 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("ProductEcommerce", productSchema);

// export default
