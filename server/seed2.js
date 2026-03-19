require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Customer = require('./models/Customer');
const Campaign = require('./models/Campaign');
const User = require('./models/User');

const customers = [
  { name: 'John Smith', email: 'john.smith@example.com', phone: '+1 234-567-8901', location: 'New York, USA' },
  { name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '+1 234-567-8902', location: 'Los Angeles, USA' },
  { name: 'Michael Chen', email: 'm.chen@example.com', phone: '+1 234-567-8903', location: 'San Francisco, USA' },
  { name: 'Emma Williams', email: 'emma.w@example.com', phone: '+1 234-567-8904', location: 'Chicago, USA' },
  { name: 'David Brown', email: 'david.brown@example.com', phone: '+1 234-567-8905', location: 'Boston, USA' },
  { name: 'Olivia Davis', email: 'olivia.d@example.com', phone: '+1 234-567-8906', location: 'Houston, USA' },
  { name: 'James Wilson', email: 'james.w@example.com', phone: '+1 234-567-8907', location: 'Phoenix, USA' },
  { name: 'Sophia Martinez', email: 'sophia.m@example.com', phone: '+1 234-567-8908', location: 'Miami, USA' },
  { name: 'Liam Anderson', email: 'liam.a@example.com', phone: '+1 234-567-8909', location: 'Seattle, USA' },
  { name: 'Ava Thomas', email: 'ava.t@example.com', phone: '+1 234-567-8910', location: 'Denver, USA' },
  { name: 'Noah Jackson', email: 'noah.j@example.com', phone: '+1 234-567-8911', location: 'Atlanta, USA' },
  { name: 'Isabella White', email: 'isabella.w@example.com', phone: '+1 234-567-8912', location: 'Dallas, USA' },
];

const seedDB = async () => {
  await connectDB();
  try {
    await Customer.deleteMany({});
    await Campaign.deleteMany({});
    console.log('Cleared existing customers and campaigns');

    const createdCustomers = await Customer.insertMany(customers);
    console.log(`Seeded ${createdCustomers.length} customers`);

    const allIds = createdCustomers.map((c) => c._id);

    const campaigns = [
      { title: 'Summer Sale 2026', channel: 'Email', message: 'Our biggest summer sale is here. Get up to 50% off on all products. Use code SUMMER50 at checkout.', customers: allIds.slice(0, 6), status: 'Sent', createdAt: new Date('2026-03-10') },
      { title: 'New Product Launch', channel: 'WhatsApp', message: 'We are excited to announce our brand new product line! Check it out now at our website.', customers: allIds.slice(2, 9), status: 'Sent', createdAt: new Date('2026-03-12') },
      { title: 'Customer Feedback', channel: 'SMS', message: 'Hi! We value your feedback. Please take 2 minutes to rate your recent experience with us.', customers: allIds.slice(0, 4), status: 'Draft', createdAt: new Date('2026-03-09') },
      { title: 'Flash Sale Alert', channel: 'Email', message: 'Flash Sale! 24 hours only. Get 30% off everything. Shop now before it ends!', customers: allIds.slice(3, 10), status: 'Sent', createdAt: new Date('2026-03-08') },
      { title: 'Welcome Campaign', channel: 'Email', message: 'Welcome to CEP Platform family! We are glad to have you. Here is a 10% discount on your first order.', customers: allIds.slice(8, 12), status: 'Sent', createdAt: new Date('2026-03-07') },
      { title: 'Loyalty Program', channel: 'WhatsApp', message: 'You have been selected for our exclusive loyalty program! Enjoy special perks and early access to new products.', customers: allIds.slice(1, 7), status: 'Draft', createdAt: new Date('2026-03-06') },
    ];

    const createdCampaigns = await Campaign.insertMany(campaigns);
    console.log(`Seeded ${createdCampaigns.length} campaigns`);

    const existing = await User.findOne({ email: 'admin@cep.com' });
    if (!existing) {
      await User.create({ name: 'Admin', email: 'admin@cep.com', password: 'admin123', role: 'admin' });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    console.log('\nDatabase seeded! Customers: ' + createdCustomers.length + ', Campaigns: ' + createdCampaigns.length);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seedDB();
