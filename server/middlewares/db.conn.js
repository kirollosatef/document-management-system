import mongoose from 'mongoose';
import { DB_URL } from '../config.js';

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully in \n\t{ DB_URL::${DB_URL} }`);
  } catch (err) {
    console.log(`Error connecting to MongoDB::${err}`);
  }
};

export default connectToDB;
