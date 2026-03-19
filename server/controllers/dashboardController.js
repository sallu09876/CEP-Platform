const Customer = require('../models/Customer');
const Campaign = require('../models/Campaign');

// @desc  Get dashboard stats
// @route GET /api/dashboard/stats
const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();

    // Current week start (Monday)
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    // Current month start
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Total counts
    const totalCustomers = await Customer.countDocuments();
    const totalCampaigns = await Campaign.countDocuments();
    const activeCampaigns = await Campaign.countDocuments({ status: 'Draft' });

    // Messages sent = sum of customers array length for all Sent campaigns
    const sentCampaigns = await Campaign.find({ status: 'Sent' }).select('customers');
    const messagesSent = sentCampaigns.reduce((acc, c) => acc + (c.customers?.length || 0), 0);

    // Trend: new customers this week
    const newCustomersThisWeek = await Customer.countDocuments({ createdAt: { $gte: weekStart } });
    const newCampaignsThisMonth = await Campaign.countDocuments({ createdAt: { $gte: monthStart } });

    // Recent campaigns (last 5)
    const recentCampaigns = await Campaign.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title channel status createdAt');

    res.json({
      success: true,
      data: {
        totalCustomers,
        totalCampaigns,
        messagesSent,
        activeCampaigns,
        newCustomersThisWeek,
        newCampaignsThisMonth,
        recentCampaigns,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardStats };
