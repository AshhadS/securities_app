const express = require('express');
const {
  registerUser,
  authUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/authController');
const { fetchSecurityTransactions } = require('../controllers/securitiesController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/', getUsers);
router.get('/user/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/securities-report', fetchSecurityTransactions);

module.exports = router;
