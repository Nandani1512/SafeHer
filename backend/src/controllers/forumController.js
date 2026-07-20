const Post = require('../models/Post');

// Get all posts
const getPosts = async (req, res) => {
  try {
    const sortBy = req.query.sort || 'recent';
    let sortObj = { createdAt: -1 };
    
    if (sortBy === 'upvotes') {
      sortObj = { upvotes: -1, createdAt: -1 };
    } else if (sortBy === 'comments') {
      // Need aggregate for comment count sorting, simpler just to sort by createdAt for now
      // Or we can fetch and sort in memory if small
    }

    const posts = await Post.find().sort(sortObj);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { title, content, category, author } = req.body;
    const newPost = new Post({ title, content, category, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Upvote a post
const upvotePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upvote' });
  }
};

// Add a reply
const addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, author } = req.body;
    
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    
    post.replies.push({ content, author });
    await post.save();
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add reply' });
  }
};

module.exports = {
  getPosts,
  createPost,
  upvotePost,
  addReply
};
