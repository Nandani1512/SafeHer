const express = require('express');
const router = express.Router();
const { handleHelplineMessage, getStatus } = require('../controllers/apiController');
const forumRoutes = require('./forumRoutes');

router.get('/status', getStatus);
router.post('/helpline', handleHelplineMessage);
router.use('/forum', forumRoutes);

module.exports = router;
