import { gql } from "@apollo/client";

export const UPLOAD_MEDIA = gql`
  mutation Upload($file: Upload!) {
    upload_media(file: $file) {
      filename
      content_type
      success
    }
  }
`;
