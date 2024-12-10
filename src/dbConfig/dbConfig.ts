import mongoose from 'mongoose';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connected to database');
    });
    connection.on('error', (err) => {
      console.error(`Error: while connection to mongodb  ${err.message}`);
    });
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
}
