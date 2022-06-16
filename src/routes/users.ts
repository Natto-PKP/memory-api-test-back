import { Router } from 'express';

import controllers from '../controllers/users';
import asyncHandler from '../helpers/asyncHandler';
import validate from '../middlewares/validate';
import schema from '../schemas/users';

import boards from './users/boards';

const router = Router({ mergeParams: true });

router.use('/:userId(\\d+)/boards', boards);

router.post('/login', validate(schema.userPost, 'body'), asyncHandler(controllers.login));
router.post('/register', validate(schema.userPost, 'body'), asyncHandler(controllers.register));

export default router;
