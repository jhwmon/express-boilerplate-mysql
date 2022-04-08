import express from 'express';
import userController from '../../controllers/user.controller';
import authentication from '../../middlewares/authenticate.middleware';
import catchAsync from '../../middlewares/catchAsync.middleware';
import { verifyRights } from '../../middlewares/verifyRights.middleware';

const { authenticate } = authentication;
const {
  findAllUsers,
  findUserById,
  updateUser,
  updatePasswordUser,
  deleteUser,
  findMe,
} = userController;

const router = express.Router();

router.get(
  '/',
  authenticate,
  verifyRights('getUsers'),
  catchAsync(findAllUsers),
);
router.get('/me', authenticate, catchAsync(findMe));
router.get(
  '/:userId',
  authenticate,
  verifyRights('selfGetUser', 'getUsers'),
  catchAsync(findUserById),
);
router.patch(
  '/:userId',
  authenticate,
  verifyRights('selfManageUser', 'manageUsers'),
  catchAsync(updateUser),
);
router.delete(
  '/:userId',
  authenticate,
  verifyRights('deleteUsers'),
  catchAsync(deleteUser),
);
router.patch('/:userId/password', authenticate, catchAsync(updatePasswordUser));

export default router;
