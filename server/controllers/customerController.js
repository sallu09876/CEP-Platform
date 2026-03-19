const Customer = require('../models/Customer');

// @desc  Get all customers
// @route GET /api/customers
const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: customers });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc  Create customer
// @route POST /api/customers
const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const existing = await Customer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const customer = await Customer.create({ name, email, phone, location });
    res.status(201).json({ success: true, data: customer });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// @desc  Update customer
// @route PUT /api/customers/:id
const updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, location },
      { new: true, runValidators: true }
    );
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// @desc  Delete customer
// @route DELETE /api/customers/:id
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json({ success: true, message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCustomers, createCustomer, updateCustomer, deleteCustomer };
