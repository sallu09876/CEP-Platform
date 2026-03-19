const Campaign = require('../models/Campaign');

// @desc  Get all campaigns
// @route GET /api/campaigns
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('customers', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, data: campaigns });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc  Create campaign
// @route POST /api/campaigns
const createCampaign = async (req, res) => {
  try {
    const { title, channel, message, customers, status } = req.body;
    if (!title || !channel || !message) {
      return res.status(400).json({ message: 'Title, channel and message are required' });
    }
    const campaign = await Campaign.create({ title, channel, message, customers, status });
    res.status(201).json({ success: true, data: campaign });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
};

// @desc  Send campaign (update status to Sent)
// @route PUT /api/campaigns/:id/send
const sendCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status: 'Sent' },
      { new: true }
    ).populate('customers', 'name email');

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    // Simulate sending delay
    console.log(`Sending campaign "${campaign.title}" to ${campaign.customers.length} customers...`);

    res.json({ success: true, data: campaign });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc  Delete campaign
// @route DELETE /api/campaigns/:id
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.json({ success: true, message: 'Campaign deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCampaigns, createCampaign, sendCampaign, deleteCampaign };
