import { Router } from 'express';

import error from '../middlewares/error';
import user from './users';

const router = Router({ mergeParams: true });

router.use('/users', user);

router.use((_req, res) => res.status(404).json({ code: 404, message: 'page not found' }));
router.use(error);

export default router;
