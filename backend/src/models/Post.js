const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
  author: { type: String, default: 'Anonymous' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  upvotes: { type: Number, default: 0 },
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
