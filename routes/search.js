import { Router } from 'express';
import { performSearch } from '../controllers/search.js';

const router = Router();

router.get('/:collection/:term', performSearch)

export default router;