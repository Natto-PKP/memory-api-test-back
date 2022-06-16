import { Router } from 'express';

const router = Router({ mergeParams: true });

router.get('/');
router.get('/:cardId(\\d+)');

export default router;
