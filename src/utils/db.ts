import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongod = MongoMemoryServer.create();

// Start connection to database for tests.
export const connect = async () => {
  const uri = (await mongod).getUri();
  await mongoose.connect(uri);
};

// Clear all documents in a collection for tests.
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

// Delete the database, close connection and stop the MongoMemoryServer.
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
};
