import { Schema, model } from 'mongoose';

const ServiceSchema = Schema({
  service: { type: Schema.Types.ObjectId,ref:'Service',required:true,unique:true},
  price: { type: Number },
});

const schema = Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  portfolio: String,
  place:{type:Schema.Types.ObjectId,ref:'Location'},
  service:[ServiceSchema],
  contact:{type:String},
  image:{type:String}
});

const Photographer = model('Photogapher', schema);
export default Photographer;
