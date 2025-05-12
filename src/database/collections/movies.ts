import mongoose from "mongoose";
import { Movies } from "../models";

export async function retrieveMovies() {
  const USERNAME = process.env.MONGO_USER;
  const PASSWORD = process.env.MONGO_PASS;

  const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@kinocluster.dtam1oe.mongodb.net/Kino?retryWrites=true&w=majority&appName=KinoCluster`;
  await mongoose.connect(uri);
  const allMovies = await Movies.find();

  return allMovies;
}
