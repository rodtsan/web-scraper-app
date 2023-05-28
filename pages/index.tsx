import { GetServerSidePropsContext } from "next";

export { default } from "@/modules/index";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return {
    props: {},
  };
};
