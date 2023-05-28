import { GetServerSidePropsContext } from "next";

export { default } from "@/modules/Auth/index";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const res = await fetch("http://localhost:8000/auth", {
    method: 'GET',
    mode: 'no-cors'
  })
  const data = await res.json();
  return {
    props: {
       ...data
    },
  };
};
