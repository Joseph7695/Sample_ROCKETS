import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import ROCKET_QUERY from '../../graphql/rocket.query';
import Link from 'next/link';
import Head from 'next/head';

const Rocket = () => {
    // Create a query hook
    const router = useRouter()
    const { rid } = router.query
    const { data, loading, error } = useQuery(ROCKET_QUERY(rid));

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {JSON.stringify(error)}</p>;
    }

    let descriptionList = [];
    for (const [key, value] of Object.entries(data.rocket)) {
        console.log(key, value);
        //descriptionList.push(<><dt>{key}: </dt><dd>{value}</dd></>)
        descriptionList.push(<div key={key}>{key}: {'' + value}</div>);
    }

    return (
        <>
            Read <Link href="/details"><a>this page!</a></Link>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <dl>
                {descriptionList}
            </dl>
        </>
    );
};
// {
//     rocket(id: "falcon1") {
//         cost_per_launch
//         active
//         boosters
//         company
//         country
//         description
//         diameter {
//             meters
//         }
//         engines {
//             type
//             version
//         }
//         first_flight
//         first_stage {
//             reusable
//             engines
//         }
//         height {
//             meters
//         }
//         id
//         landing_legs {
//             number
//             material
//         }
//         mass {
//             kg
//         }
//         name
//         payload_weights {
//             kg
//             name
//             id
//         }
//         stages
//         second_stage {
//             burn_time_sec
//             engines
//             fuel_amount_tons
//         }
//         success_rate_pct
//         type
//         wikipedia
//     }
// }

export default Rocket