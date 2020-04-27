import gql from "graphql-tag"
const FIND_LAUNCHES_QUERY = (rid) => gql`{
    launches(find: { rocket_id: "${rid}" }) {
        details
        mission_name
        launch_date_utc
    }
}`
export default FIND_LAUNCHES_QUERY;
