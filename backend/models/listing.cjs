const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  price: Number,
  user: String,
  status: { type: String, default: "pending" }, // "pending", "accepted", "rejected"
  adminReview: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', ListingSchema);
