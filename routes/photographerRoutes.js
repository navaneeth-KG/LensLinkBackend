import express from 'express';
import Photographer from '../db/models/photographerSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

//photographer signup

router.post('/signup', async (req, res) => {
  const body = req.body;
  try {
    const photographer = await Photographer.findOne({ email: body.email });
    // console.log(photographer);
    if (photographer) {
      return res.json({ message: 'user already exists' });
    }
    // console.log('working');

    if (body.password != body.confirmPassword) {
      return res.json({ message: 'password doesnt match' });
    }
    console.log('working');
    const hashedpassword = await bcrypt.hash(body.password, 2);
    body.password = hashedpassword;
    const newPg = await Photographer.create(body);
    return res.json(newPg);
  } catch (e) {
    return res.json(e);
  }
});

//photographer sign in
router.post('/signin', async (req, res) => {
  const body = req.body;
  try {
    const photographer = await Photographer.findOne({ email: body.email });
    // console.log(photographer);
    if (!photographer) {
      return res.json({ message: 'invalid username or password' });
    }
    const isValid = await bcrypt.compare(body.password, photographer.password);
    if (!isValid) {
      return res.json({ message: 'invalid username or password' });
    }

    const token = jwt.sign(
      { id: photographer._id, role: 'photographer' },
      'ABFSAFBFSAFBAOFLKAKHCKJzZKCzkjSUCGU',
      { expiresIn: '3d' }
    );

    return res.status(200).json({ message: 'logged in', token });
  } catch (e) {
    return res.json(e);
  }
});

// get pgs by location

router.get('/location/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const photographer = await Photographer.find({ place: location });
    return res.json(photographer);
  } catch (e) {
    return res.json(e);
  }
});

//get pgs by service

router.get('/service/:service', async (req, res) => {
  try {
    const { service } = req.params;
    const photographer = await Photographer.find({
      'service.service': service,
    }).populate(['place']);
    return res.json(photographer);
  } catch (e) {
    return res.json(e);
  }
});

//get pgs by service and location

router.get('/search/:service/:location', async (req, res) => {
  try {
    const { service, location } = req.params;
    const photographers = await Photographer.find({
      $and: [{ 'service.service': service }, { place: location }],
    }).populate(['place']);
    return res.json(photographers);
  } catch (e) {
    return res.json(e);
  }
});

//get pg by id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const photographer = await Photographer.findById(id)
      .populate('service.service')
      .populate('place');
    return res.json(photographer);
  } catch (e) {
    return res.json(e);
  }
});

//edit
router.patch('/:id', async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const photographer = await Photographer.findByIdAndUpdate(id, body)
      .populate('service.service')
      .populate('place');
    return res.json({ message: 'details updated' });
  } catch (e) {
    return res.json(e);
  }
});

export default router;
