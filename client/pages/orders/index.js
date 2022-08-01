import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
} from "@mui/material";

function OrderIndex({ orders }) {
  return (
    <Box mt={4} mb={4}>
      <Typography variant="h4" variantMapping={{ h4: "h1" }} align="center">
        My Orders
      </Typography>
      <TableContainer sx={{ mt: 4 }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">Title</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Order Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell align="center">{order.ticket.title}</TableCell>
                <TableCell align="center">{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/orders");

  return { orders: data };
};

export default OrderIndex;
