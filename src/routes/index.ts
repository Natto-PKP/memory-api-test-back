import { Router } from 'express';

import user from './users';

const router = Router({ mergeParams: true });

router.use('/users', user);

export default router;
