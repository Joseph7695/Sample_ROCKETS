import gql from "graphql-tag"
const FIND_LAUNCHES_QUERY = (rid) => gql`{
    launches(find: { rocket_id: "${rid}"}, limit:5) {
        details
        mission_name
        launch_date_utc
        links {
      flickr_images
    }
    }
}`
export default FIND_LAUNCHES_QUERY;
