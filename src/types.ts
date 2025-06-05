export type Movie = {
  _id?: string;
  title: string;
  story: string;
  genre: string;
  hour: number;
  minute: number;
  coverImage: string;
  sliderImage: string;
  reviews: [
    {
      date: Date;
      comment: String;
      author: String;
      rating: Number;
    },
  ];
  color: boolean;
  decade: string;
  upcoming: boolean;
  ageLimit: number;
  release: number;
  screenings: [
    {
      time: string;
      date: Date;
      saloon: string;
      title?: string;
      image?: string;
    },
  ];
};

// This type is only used for home page current screenings
export type MovieScreening = {
  title: string;
  coverImage: string;
  date?: string;
  time: string;
};

export type BookingScreening = {
  title?: string;
  time: string;
  date: Date;
  saloon: string;
  id: string;
  image?: string;
};
