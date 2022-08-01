import { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import useRequest from "../../hooks/useRequest";

function OrderShow({ order, currentUser }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [doRequest] = useRequest();

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return (
      <Box mt={4}>
        <Typography variant="h4">Order Expired</Typography>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Stack spacing={5}>
        <Typography variant="h4">
          Time left to pay: {timeLeft} seconds
        </Typography>
        <StripeCheckout
          token={(token) =>
            doRequest({
              url: "/api/payments",
              method: "post",
              body: { orderId: order.id, token: token.id },
              onSuccess: (payment) => Router.replace("/orders"),
            })
          }
          stripeKey="pk_test_XzteqwWTPx55SxpNTAYk8fMo003BdYPLJr"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
      </Stack>
    </Box>
  );
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
