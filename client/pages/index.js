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
  Link as MLink,
} from "@mui/material";
import Link from "next/link";

function Home({ tickets = [] }) {
  return (
    <Box mt={4} mb={4}>
      <Typography variant="h4" variantMapping={{ h4: "h1" }} align="center">
        Tickets
      </Typography>
      <TableContainer sx={{ mt: 4 }} component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6">Title</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Price</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">Link</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell align="center">{ticket.title}</TableCell>
                <TableCell align="center">{ticket.price}</TableCell>
                <TableCell align="center">
                  <Link
                    href={"/tickets/[ticketId]"}
                    as={`/tickets/${ticket.id}`}
                  >
                    <MLink sx={{ cursor: "pointer" }} underline="none">
                      View
                    </MLink>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

Home.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default Home;
