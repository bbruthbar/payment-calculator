import React from "react";
import { Divider, Stack, Typography } from "@mui/material";

export interface MonthsList {
  month: string;
  value: string;
  isDisabled: boolean;
  isSelected: boolean;
}
export interface PaymentTableProps {
  balance: number;
  startMonth: string;
  paymentMonths: string[];
  numberOfPayments: number;
  monthlyPayment: string;
}

export const PaymentTable = (props: PaymentTableProps) => {
  const {
    balance,
    startMonth,
    paymentMonths,
    numberOfPayments,
    monthlyPayment,
  } = props;

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" component="h2">
          Number of Payments: {numberOfPayments}
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Amount Total:{" "}
          {balance.toLocaleString("en-us", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} aria-hidden />
      <Stack direction="column" role="list" spacing={2}>
        {paymentMonths.map((month) => {
          return (
            <Stack
              direction="row"
              justifyContent="space-between"
              role="listitem"
              key={month}
            >
              <Typography variant="h6" component="span">
                {month}
              </Typography>
              <Typography variant="h6" component="span">
                {monthlyPayment}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};
