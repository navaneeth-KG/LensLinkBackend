import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Client from './../db/models/clientSchema.js';

const router = express.Router();

//signup

router.post('/signup', async (req, res) => {
  try {
    const body = req.body;
    const user = await Client.findOne({ email: body.email });
    if (user) {
      res.json({ message: 'user already exists' });
    }
    if (body.password != body.confirmPassword) {
      return res.json({ message: 'password doesnt match' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const newUser = await Client.create(body);
    return res.json(newUser);
  } catch (e) {
    res.json(e);
  }
});

//login

router.post('/signin', async (req, res) => {
  try {
    const body = req.body;
    const user = await Client.findOne({ email: body.email });

    if (!user) {
      return res.json({ message: 'incorrect email or password' });
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      return res.json({ message: 'incorrect email or password' });
    }
    const token = jwt.sign(
      { id: user._id, role: 'user' },
      'ABFSAFBFSAFBAOFLKAKHCKJzZKCzkjSUCGU',
      { expiresIn: '3d' }
    );
    return res.json({ token, message: 'logged in' });
  } catch (e) {
    return res.json(e.message);
  }
});

router.get('/:id',async(req,res)=>{
  try{
    const {id}= req.params
    const user = await Client.findById(id)
    return res.json(user)

  }catch(e){
    return res.json(e)
  }
})
router.patch('/:id',async(req,res)=>{
  try{
    const body=req.body
    const {id}= req.params
    const user = await Client.findByIdAndUpdate(id,body)
    return res.json({message:'details updated'})

  }catch(e){
    return res.json(e)
  }
})

export default router;
