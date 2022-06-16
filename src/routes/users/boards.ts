import { Router } from 'express';

import cards from './boards/cards';
import tries from './boards/tries';

const router = Router({ mergeParams: true });

router.use('/cards', cards);
router.use('/tries', tries);

router.delete('/:boardId(\\d+)');
router.get('/');
router.get('/:boardId(\\d+)');
router.patch('/:boardId(\\d+)');
router.post('/');

export default router;
