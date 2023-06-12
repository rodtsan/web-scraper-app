import { gql } from "@apollo/client";

export const GET_TOPICS = gql`
  query {
    topics {
      id
      title
      csv_file
      search_title
      search_text
    }
  }
`;

export const SYMANTIC_SEARCH = gql`
  query ($searchText: String!, $csvFile: String!) {
    symantic_search(search_input: $searchText, csv_file: $csvFile) {
      index
      text
      embedding
      similarities
    }
  }
`;
