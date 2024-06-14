import { Typography } from "@mui/material";
import React from "react";

export const PageHeading = () => {
  return (
    <>
      <Typography component="h1" variant="h3" gutterBottom>
        Payment calculator
      </Typography>
      <Typography variant="body1" paragraph>
        Calculate your payment in equal monthly installments over the remainder
        of the year instead of paying for them all at once.
      </Typography>
    </>
  );
};
