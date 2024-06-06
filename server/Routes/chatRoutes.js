const express = require('express');
const { createChat, findUserChats, findChat } = require('../Controllers/chatController');
const router = express.Router();

router.post('/create', createChat );
router.get('/find/:userID', findUserChats);
router.get('/findchat/:firstID/:secondID', findChat);

module.exports = router;