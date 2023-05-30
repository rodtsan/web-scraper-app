import { GetServerSidePropsContext } from "next";

export { default } from "@/modules/LinkedIn/List";

export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    const res = await fetch("http://127.0.0.1:5000/api/linkedin/authors", {
      method: 'GET',
      mode: 'no-cors'
    })
    const data = await res.json();
    return {
      props: {
         linkedin_authors: data
      },
    };
  };
  