const express = require('express');
const router = express.Router();
const {registerUser, loginUser, findUser, getAllUsers} = require('../Controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/find/:userID', findUser);
router.get('/findall', getAllUsers);

module.exports = router;