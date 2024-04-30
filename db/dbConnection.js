import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()
mongoose
  .connect(
    process.env.URI,
    { useNewUrlParser: 'true', useUnifiedTopology: 'true' }
  )
  .then(() => {
    console.log('data base connected');
  })
  .catch(e => {
    console.log(e);
  });
export default mongoose;
