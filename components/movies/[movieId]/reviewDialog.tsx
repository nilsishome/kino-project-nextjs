"use client";

import React from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
  styled,
} from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type Props = {
  reviewState: boolean;
  reviewStateHandle: (state: boolean) => void;
  handleReviewCreation: (data: object) => void;
};

const CustomTextField = styled(TextField)`
  & label.Mui-focused {
    color: #f1ddc5;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #f1ddc5;
    }
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #f1ddc5;
  }
`;

const ReviewDialog: React.FC<Props> = ({
  reviewState,
  reviewStateHandle,
  handleReviewCreation,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [ratingValue, setRatingValue] = React.useState<number | null>(1);
  const [comment, setComment] = React.useState<string>("");
  const [reviewerName, setReviewerName] = React.useState<string>("");

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleReviewerName = (event: any) => {
    setReviewerName(event.target.value);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={reviewState}
        onClose={reviewStateHandle}
        aria-labelledby="review-dialog-title"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <DialogTitle sx={{ paddingTop: 2 }} id="review-dialog-title">
          {"Skapa en recension"}
        </DialogTitle>
        <DialogContent
          sx={{
            paddingTop: "1rem !important",
            display: "flex",
            flexDirection: "column",
            width: "40vh",
            height: "auto",
            margin: { xs: "2rem auto 0 auto" },
          }}
        >
          <CustomTextField
            variant="outlined"
            label="Kommentar"
            onChange={handleCommentChange}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            sx={{
              marginBottom: "1rem",
            }}
            multiline
          ></CustomTextField>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1rem",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Välj ett betyg 1-5
          </Typography>
          <Rating
            value={ratingValue}
            sx={{
              marginBottom: "1rem",
              margin: "0.5rem auto 2rem auto",
            }}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
          ></Rating>

          <CustomTextField
            variant="outlined"
            label="Namn"
            onChange={handleReviewerName}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            sx={{
              marginBottom: "1rem",
            }}
          ></CustomTextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              handleReviewCreation({
                rating: ratingValue,
                comment: comment,
                author: reviewerName,
                date: new Date(),
              })
            }
            autoFocus
          >
            Skapa
          </Button>
          <Button onClick={() => reviewStateHandle(false)}>Avbryt</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ReviewDialog;
