"use client";

import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  Button,
  Divider,
  Rating,
  Stack,
} from "@mui/material";
import { Movie } from "@/types";
import ReviewDialog from "./reviewDialog";
import { toast } from "sonner";

type Props = {
  movie: Movie;
};

type creationProp = {
  author: string;
  comment: string;
  date: Date;
  rating: number;
};

const Reviews: React.FC<Props> = ({ movie }) => {
  const [reviewState, reviewStateHandle] = useState<boolean>(false);

  const handleReviewCreation = async function (data: creationProp) {
    if (data.author === "") {
      toast.error("Du måste ange ett namn för att få lämna in din recension.");
      return;
    }

    if (data.comment === "") {
      toast.error(
        "Du måste ange en kommentar för att få lämna in din recension."
      );
      return;
    }

    await fetch(`/api/movies/${movie._id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sendingData: data,
      }),
    })
      .then((response) => response.json())
      .then((reviews) => {
        movie.reviews = reviews.data;
      });

    reviewStateHandle(false);
  };

  const handleOnCreateReview = function () {
    reviewStateHandle(true);
  };

  const convertDate = function (dateProp: Date) {
    const date = new Date(dateProp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const monthString = month >= 10 ? month : `0${month}`;
    const dayString = day >= 10 ? day : `0${day}`;

    return `${year}-${monthString}-${dayString}`;
  };

  return (
    <>
      <List sx={{ marginLeft: "4vw" }}>
        <Button
          sx={{ marginBottom: "2rem" }}
          variant="outlined"
          onClick={handleOnCreateReview}
        >
          Skapa din egna recension
        </Button>

        {movie.reviews.length <= 0 && (
          <Typography>
            Det finns inga recensioner för denna film. Bli den första att skriva
            en!
          </Typography>
        )}

        {movie.reviews.map((review, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <Stack>
                <Rating
                  sx={{ marginBottom: "1.5rem" }}
                  value={Number(review.rating)}
                  readOnly
                />

                <Typography sx={{ marginBottom: "2rem" }}>
                  {review.comment}
                </Typography>

                <Typography sx={{ fontSize: "1.25rem" }}>
                  {review.author} - ({convertDate(review.date)})
                </Typography>
              </Stack>
            </ListItem>
            <Divider
              sx={{
                background: "gray",
                width: "95%",
                margin: "1rem 0 1rem 0",
              }}
            />
          </React.Fragment>
        ))}
      </List>
      {reviewState && (
        <ReviewDialog
          reviewState={reviewState}
          reviewStateHandle={reviewStateHandle}
          handleReviewCreation={handleReviewCreation}
        />
      )}
    </>
  );
};

export default Reviews;
