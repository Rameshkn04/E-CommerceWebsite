import { Product } from '../models/Product.js';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { sampleProducts } from '../data/sampleProducts.js';
import { env } from '../config/env.js';

const seed = async () => {
  try {
    await connectDatabase();
    console.log('Seeding product catalog…');

    await Product.deleteMany({});

    const products = [];
    const repeats = Math.max(1, Math.ceil(env.seedSampleCount / sampleProducts.length));

    for (let i = 0; i < repeats; i += 1) {
      sampleProducts.forEach((product, index) => {
        const clone = { ...product };
        if (repeats > 1) {
          clone.sku = `${product.sku}-${i + 1}`;
          clone.name = `${product.name} (${i + 1})`;
        }
        products.push(clone);
      });
    }

    const limitedProducts = products.slice(0, env.seedSampleCount);

    await Product.insertMany(limitedProducts);

    console.log(`✅ Inserted ${limitedProducts.length} products`);
  } catch (error) {
    console.error('❌ Failed to seed products', error);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
};

seed();

