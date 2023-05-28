export { default } from "@/modules/Auth/callback";
import { GetServerSidePropsContext } from "next";
import qs from "query-string";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { code, state } = context.query;
  const query = qs.stringify({
    grant_type: 'authorization_code',
    code,
    state,
    client_id: "86uwsof8lb49kx",
    client_secret: "VDX67kfA9eFeXFNE",
    redirect_uri: "http://localhost:3000/auth",
    scope: ["r_liteprofile", "r_emailaddress"],
  })
  const res = await fetch(`https://www.linkedin.com/oauth/v2/accessToken?${query}`, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return {
    props: {
      ...data,
    },
  };
};
