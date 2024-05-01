import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log('data base connected');
  })
  .catch(e => {
    console.log(e);
  });
export default mongoose;
