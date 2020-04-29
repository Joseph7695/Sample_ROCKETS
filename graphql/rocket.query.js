import gql from 'graphql-tag';
const ROCKET_QUERY = (rid) => gql`
{
  rocket(id: "${rid}") {
    cost_per_launch
    active
    boosters
    company
    country
    description
    diameter {
      meters
    }
    engines {
      type
      version
    }
    first_flight
    first_stage {
      reusable
      engines
    }
    height {
      meters
    }
    id
    landing_legs {
      number
      material
    }
    mass {
      kg
    }
    name
    payload_weights {
      kg
      name
      id
    }
    stages
    success_rate_pct
    wikipedia
  }
}
`;
export default ROCKET_QUERY;