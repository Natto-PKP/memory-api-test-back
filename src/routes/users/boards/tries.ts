import { Router } from 'express';

import controllers from '../../../controllers/tries';
import asyncHandler from '../../../helpers/asyncHandler';
import auth from '../../../middlewares/auth';

const router = Router();

router.get('/:tryId(\\d+)', auth, asyncHandler(controllers.try));

export default router;
