import { GetServerSidePropsContext } from "next";

export { default } from "@/modules/LinkedIn";

export const getServerSideProps = async (
    context: GetServerSidePropsContext
  ) => {
    return {
      props: {
         
      },
    };
  };
  