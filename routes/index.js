import express from 'express';
import photographerRoutes from './photographerRoutes.js';
import imageRoutes from './imageRoutes.js';
import postroutes from './postRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import clientRoutes from './clientRoutes.js';
import appointmentRoutes from './appointmentRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import locationRoutes from './locationRoutes.js';

const router = express.Router();

router.use('/photographer', photographerRoutes);
router.use('/image', imageRoutes);
router.use('/pg/post', postroutes);
router.use('/service', serviceRoutes);
router.use('/user', clientRoutes);
router.use('/book', appointmentRoutes);
router.use('/review', reviewRoutes);
router.use('/location', locationRoutes);

export default router;
