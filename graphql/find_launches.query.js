import gql from "graphql-tag"
const FIND_LAUNCHES_QUERY = gql`
query FindLaunchesQuery($rocket_id: String, $offset: Int){
    launches(find: { rocket_id: $rocket_id}, limit:5, offset: $offset) {
        details
        mission_name
        launch_date_utc
        links {
      flickr_images
    }
  }
}`
export default FIND_LAUNCHES_QUERY;
