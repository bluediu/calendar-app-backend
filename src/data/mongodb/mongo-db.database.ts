import mongoose from 'mongoose';

interface IOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: IOptions) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, { dbName });
      console.log('===-- DATABASE ONLINE ✔️ --===');
    } catch (error) {
      console.log('===-- CONNECTION ERROR ❌ --===');
      throw error;
    }
  }
}
