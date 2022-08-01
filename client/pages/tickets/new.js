import { useState } from "react";
import Router from "next/router";
import { Typography, Box, TextField, Stack, Button } from "@mui/material";
import useRequest from "../../hooks/useRequest";

export default function NewTicket() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [doRequest, errors, setErrors] = useRequest();

  const handleSubmit = (e) => {
    e.preventDefault();

    doRequest({
      url: "/api/tickets",
      method: "post",
      body: { title, price },
      onSuccess: () => Router.push("/"),
    });
  };

  const handlePriceBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <Box mt={3}>
      <Typography variant="h3" variantMapping={{ h3: "h1" }} align="center">
        Create a Ticket
      </Typography>
      <Box
        component="form"
        mt={4}
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        <Stack spacing={5}>
          <TextField
            variant="outlined"
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prevErrors) => {
                return { ...prevErrors, title: "" };
              });
            }}
            helperText={errors?.title}
            error={Boolean(errors?.title)}
          />
          <TextField
            variant="outlined"
            label="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setErrors((prevErrors) => {
                return { ...prevErrors, price: "" };
              });
            }}
            helperText={errors?.price}
            error={Boolean(errors?.price)}
            onBlur={handlePriceBlur}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
