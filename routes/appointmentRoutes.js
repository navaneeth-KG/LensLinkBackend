import express from 'express';
import Appointment from '../db/models/appointmentSchema.js';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log('its ok');
    const date = new Date();
    const body = req.body;
    const appointement = await Appointment.create({
      ...body,
      bookingDate: date,
    });
    const newApp = await Appointment.findById(appointement._id)
      .populate('photographer')
      .populate('client')
      .populate('service');

    console.log(appointement);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'navaneethkg99@gmail.com',
        pass: 'flcq obmr hcyt avca',
      },
    });
    const mailOptions = {
      from: 'navaneethkg99@gmail.com',
      to: newApp.photographer.email,
      subject: 'appointment request',
      text: `client name:${newApp.client.name} \n
             service:${newApp.service.name} \n
             date of shoot:${newApp.date}`,
    };
    transporter.sendMail(mailOptions);
    return res.json({ message: 'request sent' });
  } catch (e) {
    return res.json(e);
  }
});

//get

router.get('/', async (req, res) => {
  try {
    const apps = await Appointment.find();
    return res.json(apps);
  } catch (e) {
    return res.json(e);
  }
});

//get by user id

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Appointment.find({ client: id })
      .populate(['service', 'client', 'photographer'])
      .populate('photographer.place');
    console.log('workiiii');
    return res.json(app);
  } catch (e) {
    return res.json(e);
  }
});

//get by pg id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Appointment.find({ photographer: id }).populate([
      'client',
      'service',
    ]);
    return res.json(app);
  } catch (e) {
    return res.json(e);
  }
});

//cancel booking

router.patch('/cancel/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Appointment.findByIdAndUpdate(id, {
      status: 'CANCELLED',
    }).populate(['photographer', 'client', 'service']);
    console.log(app);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'navaneethkg99@gmail.com',
        pass: 'flcq obmr hcyt avca',
      },
    });
    const mailOptions = {
      from: 'navaneethkg99@gmail.com',
      to:[ app.client.email,app.photographer.email],
      subject: 'appointment cancelled',
      text: `client name:${app.client.name} \n
             photographer:${app.photographer.name}\n
             service:${app.service.name} \n
             date of shoot:${app.date}`,

    };
    transporter.sendMail(mailOptions);

    return res.json({ message: 'booking cancellled' });
  } catch (e) {
    return res.json(e);
  }
});

//confirm booking

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Appointment.findByIdAndUpdate(id, {
      status: 'ACCEPTED',
    }).populate(['photographer', 'client', 'service']);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'navaneethkg99@gmail.com',
        pass: 'flcq obmr hcyt avca',
      },
    });
    const mailOptions = {
      from: 'navaneethkg99@gmail.com',
      to: [app.client.email, app.photographer.email],
      subject: 'appointment confirmed',
      text: `photographer:${app.photographer.name}\nservice:${app.service.name}\ndate of shoot:${app.date}\nplease contact your photographer ${app.photographer.name} through  ${app.photographer.email} ${app.photographer.contact?`or ${app.photographer.contact}`:''}`,
    };
    transporter.sendMail(mailOptions);
    return res.json({ message: 'booking confirmed' });
  } catch (e) {
    return res.json(e);
  }
});

//delete booking

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Appointment.findByIdAndDelete(id);
    return res.json({ message: 'Appointement deleted' });
  } catch (e) {
    return res.json(e);
  }
});
export default router;
