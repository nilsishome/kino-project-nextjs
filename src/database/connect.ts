import mongoose from "mongoose";

export async function connectToDatabase() {
  const USERNAME = process.env.MONGO_USER;
  const PASSWORD = process.env.MONGO_PASS;

  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@kinocluster.dtam1oe.mongodb.net/Kino?retryWrites=true&w=majority&appName=KinoCluster`;
  return await mongoose.connect(uri);
}
