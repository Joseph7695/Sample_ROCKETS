import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import ROCKET_QUERY from '../../graphql/rocket.query';
import Link from 'next/link';
import Head from 'next/head';
import FIND_LAUNCHES_QUERY from '../../graphql/find_launches.query';

function useQueryFetch(query) {
    const { data, loading, error } = useQuery(query);
    return [data, loading, error]
}

export default function Rocket() {
    // Create a query hook
    const router = useRouter()
    const { rid } = router.query
    const [rocketData, rocketLoading, rocketError] = useQueryFetch(ROCKET_QUERY(rid));
    const [rocketLaunchesData, rocketLaunchesLoading, rocketLaunchesError] = useQueryFetch(FIND_LAUNCHES_QUERY(rid));
    if (rocketLoading || rocketLaunchesLoading) {
        return <p>rocketLoading...</p>;
    }
    if (rocketError || rocketLaunchesError) {
        return <p>rocketError: {JSON.stringify(rocketError)}</p>;
    }
    let descriptionList = [];
    for (const [key, value] of Object.entries(rocketData.rocket)) {
        if (key === '__typename') { continue; }
        descriptionList.push(<div key={key}>{key}: {'' + value}</div>);
    }
    for (const [launchkey, launchvalue] of Object.entries(rocketLaunchesData.launches)) {
        let launch = [<div key={launchkey}>{launchkey}:</div>];
        for (const [key, value] of Object.entries(launchvalue)) {
            if (key === '__typename') { continue; }
            launch.push(<div key={key}>{key}: {'' + value}</div>);
        }
        descriptionList.push(launch);
    }
    return (
        <>
            <Head>
                <title>{rocketData.rocket.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Link href="/"><a>Home</a></Link>
            <dl>
                {descriptionList}
            </dl>
        </>
    );
};