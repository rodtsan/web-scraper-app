import { gql } from "@apollo/client";

export const GET_PROFILES = gql`
query {
    profiles {
      id
      name
      description
      link
      date_added
      posts {
        id
        name
        description
        comments
        posted_by
        date_posted
      }
    }
  }
`;

export const GET_PROFILE_POSTS = gql`
  query GetProfilePosts($id: ID!) {
    profilePosts {
      id
      name
      description
      comment
      date_posted
    }
  }
`;
