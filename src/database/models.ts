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
  screenings: [
    {
      time: String,
      date: Date,
      saloon: String,
    },
  ],
});

export const Movies = mongoose.model("Movies", moviesSchema);

const bookingSchema = new mongoose.Schema({
  title: String,
  screenings: [
    {
      date: Date,
      saloon: String,
      time: String,
      seats: Array,
    },
  ],
});

export const Booking = mongoose.model("Booking", bookingSchema);
