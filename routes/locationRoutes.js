import express from 'express';
import Location from '../db/models/locationSchema.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const location = await Location.create(body);
    return res.json(location);
  } catch (e) {
    return res.json(e);
  }
});
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    return res.json(locations);
  } catch (e) {
    return res.json(e);
  }
});

export default router;
