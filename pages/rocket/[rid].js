import { useState } from 'react';
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/react-hooks';
import ROCKET_QUERY from '../../graphql/rocket.query';
import Link from 'next/link';
import Head from 'next/head';
import FIND_LAUNCHES_QUERY from '../../graphql/find_launches.query';

function useQueryFetch(query, variables) {
    const { data, loading, error } = useQuery(query, variables);
    return [data, loading, error]
}
function descriptionCard(key, value) {
    return (
        <div key={key} className="column is-one-third">
            <article className="card">
                <div className='card-header'>
                    <h1 className="card-header-title title is-size-4">{key}</h1>
                </div>
                <div className="card-content">
                    <p className="subtitle is-size-5">{'' + value}</p>
                </div>
            </article>
        </div>
    )
}
export default function Rocket() {
    const openImageModal = function (props) {
        console.log(props);
        setSelectedImage(props);
        setIsShowModal(true);
    }
    function LaunchCard(props) {
        let images = [];
        props.launch.links.flickr_images.forEach(image =>
            images.push((
                <figure key={image} className='card-footer-item image is-128x128 is-clipped column is-one-quarter' >
                    <img onClick={() => openImageModal(image)} src={image}></img>
                </figure>
            )));
        const launchDate = new Date(props.launch.launch_date_utc).toDateString();
        return (
            <div className="card">
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-3">{props.launch.mission_name}</p>
                            <time className='subtitle is-6' dateTime={props.launch.launch_date_utc}>Launch@{launchDate}</time>
                        </div>
                    </div>
                    <div className="content">
                        {props.launch.details}
                    </div>
                </div>
                <footer className="card-footer">
                    <div className="columns is-multiline">
                        {images}
                    </div>
                </footer>
            </div >
        );
    }

    // Create a query hook
    const router = useRouter()
    const { rid } = router.query;
    const [page, setPage] = useState(0);
    const [rocketData, rocketLoading, rocketError] = useQueryFetch(ROCKET_QUERY(rid));
    const [rocketLaunchesData, rocketLaunchesLoading, rocketLaunchesError] = useQueryFetch(FIND_LAUNCHES_QUERY, {
        variables: { rocket_id: rid, offset: page * 5 }
    });
    const [selectedImage, setSelectedImage] = useState();
    const [isShowModal, setIsShowModal] = useState(false);
    if (rocketLoading || rocketLaunchesLoading) {
        return <p>rocketLoading...</p>;
    }
    if (rocketError || rocketLaunchesError) {
        return <p>rocketError: {JSON.stringify(rocketError)}</p>;
    }
    let descriptionList = [];
    let launchesList = [];
    for (const [key, value] of Object.entries(rocketData.rocket)) {
        switch (key) {
            case '__typename': break;
            case 'diameter':
            case 'height':
                descriptionList.push(descriptionCard(key, value.meters + ' meters')); break;
            case 'mass':
                descriptionList.push(descriptionCard(key, value.kg + ' kg')); break;
            case 'payload_weights':
                for (let i = 0; i < value.length; i++) {
                    const payload = value[i];
                    descriptionList.push(descriptionCard(`Payload ${i + 1} name`, payload.kg + ' kg'));
                    descriptionList.push(descriptionCard(`Payload ${i + 1} Id`, payload.id));
                    descriptionList.push(descriptionCard(`Payload ${i + 1} weight`, payload.name));
                }
                break;
            case 'engines':
                descriptionList.push(descriptionCard('engine type', value.type));
                descriptionList.push(descriptionCard('engine version', value.version));
                break;
            case 'first_stage':
                descriptionList.push(descriptionCard('Reusable first stage?', value.reusable));
                descriptionList.push(descriptionCard('Engines (First-stage)', value.engines));
                break;
            case 'first_stage':
                descriptionList.push(descriptionCard('No. of Landing legs', value.number));
                descriptionList.push(descriptionCard('Material of Landing legs', value.material));
                break;
            default: descriptionList.push(descriptionCard(key, value)); break;
        }
    }
    for (const [launchkey, launchvalue] of Object.entries(rocketLaunchesData.launches)) {
        launchesList.push(<LaunchCard key={launchkey} launch={launchvalue}></LaunchCard>);
    }
    return (
        <>
            <Head>
                <title>{rocketData.rocket.name}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="section is-paddingles">
                <div className="container">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><a href="/">Rockets</a></li>
                            <li className="is-active"><a href="#" aria-current="page">{rocketData.rocket.name} Details</a></li>
                        </ul>
                    </nav>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="columns is-multiline">
                        {descriptionList}
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="columns is-multiline">
                        {descriptionList}
                    </div>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="title is-2">Launches: </div>
                    <nav className="pagination" role="navigation" aria-label="pagination">
                        <a onClick={() => setPage(prevPage => Math.min(prevPage - 1, 0))}
                            disabled={page === 0} className="pagination-previous" title="This is the first page" >Previous</a>
                        <a onClick={() => setPage(prevPage => prevPage + 1)} className="pagination-next">Next page</a>
                        {/* <ul className="pagination-list">
                            <li>
                                <a className="pagination-link is-current" aria-label="Page 1" aria-current="page">1</a>
                            </li>
                            <li>
                                <a className="pagination-link" aria-label="Goto page 2">2</a>
                            </li>
                            <li>
                                <a className="pagination-link" aria-label="Goto page 3">3</a>
                            </li>
                        </ul> */}
                    </nav>
                    {launchesList}
                </div>
            </section>
            <div className={"modal" + (isShowModal ? " is-active" : "")}>
                <div className="modal-background"></div>
                <div className="modal-content is-clipped">
                    <p className="image">
                        <img src={selectedImage} alt=""></img>
                    </p>
                </div>
                <button onClick={() => { setIsShowModal(false) }} className="modal-close is-large" aria-label="close"></button>
            </div>
        </>
    );
};