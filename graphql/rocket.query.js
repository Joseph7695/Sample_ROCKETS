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
    second_stage {
      burn_time_sec
      engines
      fuel_amount_tons
    }
    success_rate_pct
    type
    wikipedia
  }
}
`;
export default ROCKET_QUERY;