import { Router } from 'express';

import controllers from '../../controllers/boards';
import asyncHandler from '../../helpers/asyncHandler';
import auth from '../../middlewares/auth';

import tries from './boards/tries';

const router = Router({ mergeParams: true });

router.use('/tries', tries);

router.post('/', auth, asyncHandler(controllers.create));

export default router;
