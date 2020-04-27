import gql from "graphql-tag";

const LAUNCHES_QUERY = gql`
{
  launches {
    rocket {
      rocket {
        id
      }
    }
    links {
      flickr_images
    }
  }
}
`;
export default LAUNCHES_QUERY;
