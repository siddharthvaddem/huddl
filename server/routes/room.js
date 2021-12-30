import express from 'express'
import { createRoom,joinRoom } from '../controllers/room.js';







const router = express.Router();

router.post('/',createRoom)
router.post('/joinRoom',joinRoom)


export default router;