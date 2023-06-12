import { initializeApollo } from "@/common/apolloClient";
import { GET_TOPICS } from "@/common/gqlTags/queries";
import { TopicsData } from "@/common/models";
import { ApolloClient, FetchPolicy, NormalizedCacheObject, useQuery } from "@apollo/client";
import { GetServerSidePropsContext, NextPageContext } from "next";

export { default } from "@/modules/Word_Embedding";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = initializeApollo();
  const { data } = await client.query<TopicsData>({
    query: GET_TOPICS,
    fetchPolicy: "cache-first"
  });

  return {
    props: {
      topics: [],
      ...data,
    },
  };
};

// const getInitialProps = async (appContext: NextPageContext ) => {

//     if (appContext.cxt.req) // server?
//     {
//         //server stuff
//     }
//     else {
//         // client stuff
//     }
// }
