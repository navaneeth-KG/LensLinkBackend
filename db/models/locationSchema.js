import { Schema, model } from 'mongoose';

const schema = Schema({
  name: { type: String, required: true },
  image: { type: String },
});

const Location = model('Location',schema)
export default Location