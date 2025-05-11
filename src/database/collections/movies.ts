import mongoose from "mongoose";
import { Movies } from "../models";

export async function retrieveMovies() {
  const uri =
    "mongodb+srv://nilsnyberg24:yIGZm59YQC0CaqvH@kinocluster.dtam1oe.mongodb.net/Kino?retryWrites=true&w=majority&appName=KinoCluster";
  await mongoose.connect(uri);
  const allMovies = await Movies.find();

  return allMovies;
}
