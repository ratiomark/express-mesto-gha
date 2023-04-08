const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserProfile);
router.get('/:userId', getUserById);
router.get('', getUsers);
router.post('', createUser);
module.exports = router;
