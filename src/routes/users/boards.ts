import { Router } from 'express';

import controllers from '../../controllers/boards';
import asyncHandler from '../../helpers/asyncHandler';
import auth from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import schemas from '../../schemas/boards';

import tries from './boards/tries';

const router = Router({ mergeParams: true });

router.use('/:boardId(\\d+)/tries', tries);
router.post('/', auth, validate(schemas.create, 'query'), asyncHandler(controllers.create));

export default router;
