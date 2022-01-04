import express from 'express';
import { createDoc, getDoc } from '../controllers/docs.js';

const router = express.Router();
router.post('/', createDoc);
//router.put('/update', updateDoc);
router.post('/fetch', getDoc);

export default router;
