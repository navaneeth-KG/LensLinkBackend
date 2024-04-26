import { Schema, model } from 'mongoose';

const schema = Schema({
  name: { type: String },

  // photographers:[{type:Schema.Types.ObjectId,ref:'Photographer'}],
  image:{type:String}
  
});

const Service = model('Service', schema);
export default Service;
