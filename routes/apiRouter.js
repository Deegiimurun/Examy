import express from 'express';

import {
  examController,
  resultController,
  historyController,
  examDeleteController
} from '../controllers/apiController';

const router = express.Router();

router.get('/exam', examController);
router.delete('/exam', examDeleteController);
router.post('/result', resultController);
router.get('/history', historyController);

export default router;
