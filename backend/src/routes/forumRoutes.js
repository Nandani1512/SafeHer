const express = require('express');
const router = express.Router();
const { getPosts, createPost, upvotePost, addReply } = require('../controllers/forumController');

router.get('/posts', getPosts);
router.post('/posts', createPost);
router.post('/posts/:id/upvote', upvotePost);
router.post('/posts/:id/reply', addReply);

module.exports = router;
