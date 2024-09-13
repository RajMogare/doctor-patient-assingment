import express from 'express';
import {
  addConsultation,
  getConsultations,
  updateConsultation,
  deleteConsultation
} from '../controllers/consultationController.js';

const router = express.Router();

router.post('/', addConsultation);
router.get('/', getConsultations);
// Uncomment and implement these if you need update and delete functionality
// router.put('/:id', updateConsultation);
// router.delete('/:id', deleteConsultation);

export default router;
