import { Schema, model } from 'mongoose';

const schema = Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  contact: { type: Number },
  image:{type:String}
});

const Client = model('Client', schema);
export default Client;
