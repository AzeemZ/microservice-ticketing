import { useState } from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import Router from "next/router";

import useRequest from "../../hooks/useRequest";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doRequest, errors, setErrors] = useRequest();

  const handleSubmit = () => {
    doRequest({
      url: "/api/users/signup",
      method: "post",
      body: { email, password },
      onSuccess: () => Router.push("/"),
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "&": { height: "80vh", textAlign: "center", paddingTop: "10vh" },
        "& button": { m: 3, width: "25%" },
        "& .MuiTextField-root": { m: 3, width: "60%" },
      }}
      autoComplete="off"
    >
      <Typography variant="h3" component="h3">
        Sign Up
      </Typography>
      <br />
      <div>
        <TextField
          id="outlined-email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prevErrors) => {
              return { ...prevErrors, email: "" };
            });
          }}
          helperText={errors?.email}
          error={Boolean(errors?.email)}
        />
      </div>
      <div>
        <TextField
          id="outlined-password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prevErrors) => {
              return { ...prevErrors, password: "" };
            });
          }}
          helperText={errors?.password}
          error={Boolean(errors?.password)}
        />
      </div>
      <Button variant="contained" size="large" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}
