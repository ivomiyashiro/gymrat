import mongoose from 'mongoose';

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI);
    console.log('DB Online');
    
  } catch (error) {
    console.log(error);
    throw new Error('Database error.');
  }
};
