import express from 'express';
import Review from './../db/models/reviewSchema.js';


const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const review= await Review.create(req.body)
    return res.json(review)
  } catch (e) {
    return res.json(e)
  }
});
//get by servicd id
router.get('/service/:id', async (req, res) => {
  try {
    const {id}= req.params
    const review= await Review.find({service:id}).populate(['photographer'])
    console.log(review);
    return res.json(review)
  } catch (e) {
    return res.json(e)
  }

});

//get review by pgId


router.get('/:pgId', async (req, res) => {
  try {
    const {pgId}= req.params
    const review= await Review.find({photographer:pgId}).populate(['client'])
    console.log(review);
    return res.json(review)
  } catch (e) {
    return res.json(e)
  }

});


export default router
