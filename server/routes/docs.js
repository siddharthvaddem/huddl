import express from 'express';
import { createDoc } from '../controllers/docs.js';

const router = express.Router();
router.post('/', createDoc);

export default router;
