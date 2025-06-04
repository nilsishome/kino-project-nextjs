import mongoose from "mongoose";

export async function connectToDatabase() {
  // Återanvänder anslutning för testning
  if (mongoose.connection.readyState === 1) return;

  // Använder testdatabas om MONGODB_URI är satt, annars produktionsdatabas
  const uri =
    process.env.MONGODB_URI ||
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@kinocluster.dtam1oe.mongodb.net/Kino?retryWrites=true&w=majority&appName=KinoCluster`;

  return await mongoose.connect(uri);
}