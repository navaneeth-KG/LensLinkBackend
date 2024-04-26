import { Schema, model } from 'mongoose';

const schema = Schema({
  client: {type:Schema.Types.ObjectId,ref:'Client'},
  photographer: {type:Schema.Types.ObjectId,ref:'Photogapher'},
  date: {type:String},
  bookingDate:{type:String},
  service: {type:Schema.Types.ObjectId,ref:'Service'},
  status: {
    type: String,
    enum: ['REQUESTED', 'ACCEPTED', 'CANCELLED'],
    default: 'REQUESTED',
  },
});

const Appointment = model('Appointment', schema);
export default Appointment;
