import express from 'express';
import { createDoc, getDoc, updateDoc } from '../controllers/docs.js';

const router = express.Router();
router.post('/', createDoc);
router.patch('/', updateDoc);
router.post('/fetch', getDoc);
//router.delete('/', deleteDoc);

export default router;
