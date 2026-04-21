const { db } = require('./src/config/firebase');

const products = [
  {
    name: 'Minimalist Oak Chair',
    price: 299,
    category: 'Chairs',
    description: 'The Oak Chair combines timeless Scandinavian design with premium comfort.',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600',
    stock: 25,
    rating: 4.8
  },
  {
    name: 'Velvet Sofa Green',
    price: 899,
    category: 'Sofas',
    description: 'A luxurious velvet sofa that brings a touch of class to any living room.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600',
    stock: 10,
    rating: 4.9
  },
  {
    name: 'Marble Coffee Table',
    price: 450,
    category: 'Tables',
    description: 'Elegant marble top coffee table with sleek metallic legs.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=600',
    stock: 15,
    rating: 4.7
  }
];

const seed = async () => {
  try {
    for (const product of products) {
      await db.collection('products').add({
        ...product,
        createdAt: new Date().toISOString()
      });
      console.log(`Added: ${product.name}`);
    }
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seed();
