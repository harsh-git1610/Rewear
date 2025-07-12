const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.cjs');

// Get all listings
router.get('/', async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

// Add a new listing
router.post('/', async (req, res) => {
  const newListing = new Listing(req.body);
  await newListing.save();
  res.status(201).json(newListing);
});

// Update a listing
router.put('/:id', async (req, res) => {
  const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete a listing
router.delete('/:id', async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Accept a listing
router.patch('/:id/accept', async (req, res) => {
  const updated = await Listing.findByIdAndUpdate(req.params.id, { status: "accepted" }, { new: true });
  res.json(updated);
});

// Reject a listing (with optional review)
router.patch('/:id/reject', async (req, res) => {
  const updated = await Listing.findByIdAndUpdate(
    req.params.id,
    { status: "rejected", adminReview: req.body.adminReview || "" },
    { new: true }
  );
  res.json(updated);
});


module.exports = router;