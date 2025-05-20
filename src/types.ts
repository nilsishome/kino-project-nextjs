export type Movie = {
  _id: string;
  title: string;
  story: string;
  genre: string;
  hour: number;
  minute: number;
  coverImage: string;
  sliderImage: string;
  reviews: [];
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
