import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "@mui/material";

import buildClient from "../api/build-client";
import Header from "../components/header";

function MyApp({ Component, pageProps, currentuser }) {
  return (
    <>
      <Header currentUser={currentuser} />
      <CssBaseline />
      <Container>
        <Component currentUser={currentuser} {...pageProps} />
      </Container>
    </>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentuser
    );
  }

  return { pageProps, ...data };
};

export default MyApp;
