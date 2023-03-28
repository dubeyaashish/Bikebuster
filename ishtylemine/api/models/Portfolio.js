const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'Portfolio'},
  title: String,
  description: String,
  perks: [String],
  extraInfo: String,
  address: String,
  price: Number,
});

const PortfolioModel = mongoose.model('Portfolio', portfolioSchema);

module.exports = PortfolioModel;