/*
    Endpoint: api/users
*/

const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users.controller');
const router = Router();

router.get('/getUsers', getUsers);
router.post('/createUser', createUser);

module.exports = router;