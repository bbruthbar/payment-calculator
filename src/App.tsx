import React from "react";
import { PageHeading, PaymentForm } from "./components";
import { Paper, Stack } from "@mui/material";

function App() {
  return (
    <Paper
      sx={{
        backgroundColor: "background.light",
        p: 4,
        borderRadius: 2,
        width: "60%",
        mx: "auto",
        my: 5,
      }}
    >
      <PageHeading />
      <Stack spacing={3}>
        <PaymentForm startMonth="5" amount="" />
      </Stack>
    </Paper>
  );
}

export default App;
