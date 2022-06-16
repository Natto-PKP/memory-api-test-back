import { Router } from 'express';

const router = Router();

router.get('/');
router.get('/:tryId(\\d+)');

export default router;
