import { Box, Typography, Button, Divider, Stack } from "@mui/material";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

function TicketShow({ ticket }) {
  const [doRequest, errors] = useRequest();

  const purchaseTicket = () => {
    doRequest({
      url: "/api/orders",
      method: "post",
      body: { ticketId: ticket.id },
      onSuccess: (order) =>
        Router.push("/orders/[orderId]", `/orders/${order.id}`),
    });
  };

  return (
    <Box mt={4}>
      <Stack spacing={2}>
        <Typography variant="h5">{ticket.title}</Typography>
        <Divider />
        <Typography variant="h6">{ticket.price}$</Typography>
        <Divider />
        <Typography color="red">{errors}</Typography>
        <Button variant="contained" onClick={purchaseTicket}>
          Purchase
        </Button>
      </Stack>
    </Box>
  );
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default TicketShow;
