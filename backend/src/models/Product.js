import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    image: {
      type: String,
      trim: true
    },
    brand: {
      type: String,
      trim: true
    },
    category: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    sku: {
      type: String,
      trim: true,
      unique: true,
      sparse: true
    },
    inventoryCount: {
      type: Number,
      default: 0,
      min: 0
    },
    highlights: [
      {
        type: String,
        trim: true
      }
    ]
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);

