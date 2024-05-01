import { Schema, model } from 'mongoose';
const likeSchema = Schema({
  count: { type: Number, default: 0 },
  likedPeople: [
    { type: Schema.Types.ObjectId, ref: ['Client', 'Photogapher'] },
  ],
});


const schema = Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  likes: likeSchema,
  photographer: { type: Schema.Types.ObjectId, ref: 'Photogapher' },
  category: { type: Schema.Types.ObjectId, ref: 'Service' },
});

const Post = model('Post', schema);
export default Post;
