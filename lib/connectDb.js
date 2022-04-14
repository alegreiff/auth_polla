import mongoose from 'mongoose';

const connectDB = () => {
  if (mongoose.connections[0].readyState) {
    console.log('Ya está Conectado vía Mongoose');
    return;
  }

  mongoose.connect(process.env.MONGO_URI, {}, (err) => {
    if (err) throw err;
    console.log('Conectado mongoose');
  });
};

export default connectDB;
