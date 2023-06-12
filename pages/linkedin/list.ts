import { initializeApollo } from "@/common/apolloClient";
import { GET_PROFILES } from "@/common/gqlTags/queries";
import { ProfilesData } from "@/common/models";
import { GetServerSidePropsContext } from "next";
export { default } from "@/modules/LinkedIn/List";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = initializeApollo();
  const { data } = await client.query<ProfilesData>({
    query: GET_PROFILES,
  });
  return {
    props: {
      profiles: [],
      ...data
    },
  };
};
