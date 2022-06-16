import { Router } from 'express';

import boards from './users/boards';

const router = Router({ mergeParams: true });

router.use('/:userId(\\d+)/boards', boards);

router.post('/login');
router.post('/register');

export default router;
