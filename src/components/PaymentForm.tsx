import React, { useMemo } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  TextField,
  Select,
  Stack,
  SelectChangeEvent,
} from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { PaymentTable } from "./PaymentTable";

export interface PaymentFormProps {
  amount: string;
  startMonth: string;
}

export const PaymentForm = ({ amount, startMonth }: PaymentFormProps) => {
  const today = new Date();
  const {
    control,
    register,
    clearErrors,
    setValue,
    setError,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<PaymentFormProps>({});

  const monthsList = useMemo(() => {
    return Array.from({ length: 12 }, (item, i) => {
      const today = new Date();
      const month = new Date(0, i).toLocaleString("default", { month: "long" });
      const value = (12 - i).toString();
      const isDisabled = i < today.getMonth();
      const isSelected = i === today.getMonth();
      return { month, value, isDisabled, isSelected };
    });
  }, []);

  const defaultMonth = monthsList
    .filter((item) => item.isSelected)
    .map((item) => item.value)[0];

  const validateAmountInput = (input: string) => {
    const regex = /^[1-9]\d*(((,\d{3}){0,})?(\.\d{0,2})?)$/g;

    console.log(input.replace(/\,(?=(\d{3}))/g, ""));
    if (regex.test(input)) {
      setValue("amount", input);
    } else {
      setError("amount", { message: "Amount must be a number" });
    }
  };

  const onSubmit: SubmitHandler<PaymentFormProps> = (formData) => {
    if (formData.amount !== "" || undefined) {
      validateAmountInput(formData.amount);
    } else {
      setError("amount", { message: "Amount is required" });
    }
  };

  const displayTable = () => {
    const input = getValues("amount").replace(/\,(?=(\d{3}))/g, "");
    const balance = Number(input);
    const startMonthValue = getValues("startMonth");
    const numberOfPayments = Number(startMonthValue);
    const startMonthIndex = monthsList.findIndex(
      (item) => item.value === startMonthValue
    );
    const paymentMonths = monthsList
      .slice(startMonthIndex)
      .map((item) => item.month);
    const monthlyPayment = (balance / numberOfPayments).toLocaleString(
      "en-us",
      { style: "currency", currency: "USD" }
    );
    return (
      <PaymentTable
        balance={balance}
        startMonth={startMonthValue}
        paymentMonths={paymentMonths}
        numberOfPayments={numberOfPayments}
        monthlyPayment={monthlyPayment}
      />
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="amount"
              defaultValue={amount}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    {...register("amount")}
                    variant="outlined"
                    label="Amount"
                    InputLabelProps={{ htmlFor: "amount", required: true }}
                    error={!!errors.amount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),

                      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        const { value } = e.target;
                        setValue("amount", value);
                      },
                    }}
                  />
                );
              }}
            />
            {errors.amount && (
              <FormHelperText error>{errors.amount.message}</FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="startMonth">
              Which month would you start repayment?
            </InputLabel>
            <Controller
              control={control}
              name="startMonth"
              defaultValue={defaultMonth || startMonth}
              render={({ field }) => (
                <Select
                  {...field}
                  {...register("startMonth")}
                  label="Which month would you start repayment?"
                  native
                  error={!!errors.startMonth}
                  onChange={(e: SelectChangeEvent) => {
                    const { value } = e.target;
                    setValue("startMonth", value);
                  }}
                >
                  {monthsList.map((option) => {
                    const { month, value, isDisabled, isSelected } = option;
                    return (
                      <option value={value} key={month} disabled={isDisabled}>
                        {month}
                      </option>
                    );
                  })}
                </Select>
              )}
            />
            {errors.startMonth && (
              <FormHelperText error>Select a month</FormHelperText>
            )}
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Calculate
          </Button>
        </Stack>
      </form>

      {isSubmitted && !errors.amount && displayTable()}
    </>
  );
};
