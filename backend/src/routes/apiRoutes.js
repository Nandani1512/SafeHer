const express = require('express');
const router = express.Router();
const { handleHelplineMessage, getStatus } = require('../controllers/apiController');

router.get('/status', getStatus);
router.post('/helpline', handleHelplineMessage);

module.exports = router;
