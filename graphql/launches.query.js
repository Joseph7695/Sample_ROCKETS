import gql from 'graphql-tag';

const LAUNCHES_QUERY = gql`
{
  launchesPast(limit: 10) {
    mission_name  
  }
}
`;
export default LAUNCHES_QUERY;
