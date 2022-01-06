import express from 'express';
import { createDoc, getDoc, updateDoc, deleteDoc } from '../controllers/docs.js';

const router = express.Router();
router.post('/', createDoc);
router.patch('/', updateDoc);
router.get('/fetch/:id', getDoc);
router.delete('/:id', deleteDoc);

export default router;
