import gql from 'graphql-tag';

const ROCKETS_QUERY = gql`
{
  rockets {
    id
    name
    country
  }
}
`;
export default ROCKETS_QUERY;
