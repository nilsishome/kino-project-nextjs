import mongoose from "mongoose";

// Movies Schema
const moviesSchema = new mongoose.Schema({
  title: String,
  story: String,
  genre: String,
  hour: Number,
  minute: Number,
  coverImage: String,
  sliderImage: String,
  reviews: Array,
  color: Boolean,
  decade: String,
  upcoming: Boolean,
  ageLimit: Number,
  release: Number,
});

export const Movies = mongoose.model("Movies", moviesSchema);
