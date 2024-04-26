import mongoose from 'mongoose';
mongoose
  .connect('mongodb://localhost:27017/lensLink')
  .then(() => {
    console.log('data base connected');
  })
  .catch(e => {
    console.log(e);
  });
 export default mongoose