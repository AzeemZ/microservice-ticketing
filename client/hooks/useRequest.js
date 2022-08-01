import axios from "axios";
import { useState } from "react";

export default function useRequest() {
  const [errors, setErrors] = useState(null);

  const doRequest = async ({ url, method, body, onSuccess }) => {
    try {
      const response = await axios[method](url, body);
      typeof onSuccess === "function" && onSuccess(response.data);
    } catch (e) {
      e.response?.data.errors.map((err) => {
        if (err?.message && !err?.field) {
          setErrors(err.message);
        } else if (!err?.field) {
          setErrors(err);
        } else {
          setErrors((prevErrors) => {
            return { ...prevErrors, [err.field]: err.message };
          });
        }
      });
    }
  };

  return [doRequest, errors, setErrors];
}
