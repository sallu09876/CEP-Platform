const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'], trim: true },
    channel: {
      type: String,
      enum: ['Email', 'WhatsApp', 'SMS'],
      required: [true, 'Channel is required'],
    },
    message: { type: String, required: [true, 'Message is required'] },
    customers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }],
    status: {
      type: String,
      enum: ['Draft', 'Sent'],
      default: 'Draft',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);
