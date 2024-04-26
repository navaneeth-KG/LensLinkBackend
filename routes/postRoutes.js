import express from 'express';
import Post from './../db/models/postSchema.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const post = await Post.create(body);
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (e) {
    res.json(e);
  }
});

// get post by pg id
router.get('/photographer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ photographer: id });
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

//get post by service id
router.get('/service/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.find({ category: id }).populate(['photographer']);
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const post = await Post.findByIdAndUpdate(id, body);
    res.json(post);
  } catch (e) {
    res.json(e);
  }
});

router.patch('/:id/like/:userId', async (req, res) => {
  try {
    const { id, userId } = req.params;
    const postt = await Post.findOne({ _id: id });

    let likedArr = [...postt.likes.likedPeople];
    console.log(likedArr);
    const userIdObjectID = new mongoose.Types.ObjectId(userId);
    console.log(userIdObjectID);
    if (
      !likedArr.map(id => id.toString()).includes(userIdObjectID.toString())
    ) {
      likedArr = [...postt.likes.likedPeople, userId];
      console.log(likedArr);
      const currentLike = postt.likes.count + 1;
      await Post.findByIdAndUpdate(id, {
        likes: { count: currentLike, likedPeople: likedArr },
      });
      return res.json({ message: 'post liked' });
    } else {
      return res.json({ message: 'already liked' });
    }
  } catch (e) {
    return res.json(e);
  }
});

router.patch('/:id/unlike/:userId', async (req, res) => {
  try {
    const { id, userId } = req.params;
    const postt = await Post.findOne({ _id: id });
    const likedpersons = [...postt.likes.likedPeople];
    const userIdObjectID = new mongoose.Types.ObjectId(userId);
    if (
      likedpersons.map(id => id.toString()).includes(userIdObjectID.toString())
    ) {
      const currentlike = postt.likes.count - 1;
      const i = likedpersons.indexOf(userId);
      likedpersons.splice(i, 1);
      await Post.findByIdAndUpdate(id, {
        likes: { count: currentlike, likedPeople: likedpersons },
      });
      return res.json({ message: 'post disliked' });
    }
  } catch (e) {
    return res.json(e);
  }
});

export default router;
