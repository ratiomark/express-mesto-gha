const router = require('express').Router();

const {
  getUsers,
	getUserById,
	getUserData,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserProfile);
router.get('/me', getUserData);
router.get('/:userId', getUserById);
router.get('', getUsers);
module.exports = router;
