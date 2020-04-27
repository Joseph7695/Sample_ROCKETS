const LAUNCHES_QUERY = (rid) => `
{
    launches(find: { rocket_id: "${rid}"}) {
        links {
            flickr_images
        }
    }
}
`;
const numbers = [0, 1, 3, 4, 5];
const rocketIds = [
    "falcon1",
    "falcon9",
    "falconheavy",
    "starship"
];
rocketIds.map(function (rocket) {
    rocket.json()
        .then(result => {
            const launches = result.data.launches;
            var link = '';
            for (let i = 0; i < launches.length; i++) {
                for (let j = 0; j < launches[i].links.flickr_images.length; j++) {
                    link = launches[i].links.flickr_images[j];
                }
                if (link.length > 0) { break; }
            }
            return link;
        }).catch(err => {
            return err.toString();
        })
})
    .then(result => console.log("result", result));