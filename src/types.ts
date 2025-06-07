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
      comment: string;
      author: string;
      rating: number;
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
      _id: string;
    },
  ];
};

// This type is only used for home page current screenings
export type MovieScreening = {
  _id: string;
  screeningId: string;
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
  _id: string;
  image?: string;
};
