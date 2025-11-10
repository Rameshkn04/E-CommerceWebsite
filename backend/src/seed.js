import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import { Product } from './models/Product.js';

const dummyProducts = [
  {
    name: 'Everyday Water Bottle',
    description: 'Insulated stainless bottle that keeps drinks cold for 24 hours.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1526406915891-7bcd65f60845',
    category: 'Outdoors'
  },
  {
    name: 'Canvas Utility Tote',
    description: 'Heavy-duty canvas tote with inner pockets and reinforced straps.',
    price: 39.5,
    image: 'https://images.unsplash.com/photo-1520975922284-9f0b75fda342',
    category: 'Accessories'
  },
  {
    name: 'Porcelain Mug Set',
    description: 'Set of 2 matte porcelain mugs with ergonomic handles.',
    price: 24.0,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38',
    category: 'Kitchen'
  },
  {
    name: 'Minimal Table Lamp',
    description: 'Warm LED table lamp with frosted glass shade.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6',
    category: 'Lighting'
  }
];

const run = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    const enriched = dummyProducts.map((p, i) => ({
      ...p,
      imageUrl: p.image,
      sku: `SEED-${i + 1}`,
      inventoryCount: 20
    }));
    const inserted = await Product.insertMany(enriched);
    console.log(`✅ Seeded ${inserted.length} products`);
  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

run();

