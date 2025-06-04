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
    }
  ];
  color: boolean;
  decade: string;
  upcoming: boolean;
  ageLimit: number;
  release: number;
  screenings: [
    {
      time: String;
      date: Date;
      saloon: String;
    }
  ];
};

// This type is only used for home page current screenings
export type MovieScreening = {
  title: string;
  coverImage: string;
  date?: string;
  time: string;
};
