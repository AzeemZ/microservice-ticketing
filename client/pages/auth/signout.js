import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import Router from "next/router";

export default function Signout() {
  const [doRequest] = useRequest();

  useEffect(() => {
    doRequest({
      url: "/api/users/signout",
      method: "post",
      body: {},
      onSuccess: () => Router.push("/"),
    });
  }, []);

  return <div>Signing you out...</div>;
}
