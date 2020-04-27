import React, { useReducer, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ROCKETS_QUERY from '../graphql/rockets.query';
import launches_QUERY from '../graphql/launches.query';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

function usePrepareImages(rockets) {
  const [data, setData] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  React.useEffect(
    () => {
      async function getLinks() {
        if (!rockets) { return }
        const result = await rockets.map(async rocket => {
          var result = await fetch('https://api.spacex.land/graphql/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: launches_QUERY(rocket.id) })
          });
          var jsonresult = await result.json();
          const launches = jsonresult.data.launches;
          var link = '';
          for (let i = 0; i < launches.length; i++) {
            for (let j = 0; j < launches[i].links.flickr_images.length; j++) {
              link = launches[i].links.flickr_images[j];
            }
            if (link.length > 0) { break; }
          }
        })
      }
      var links = getLinks();
      console.log(links);
      // setError(err.toString())
      // setLoading(false)
      // console.log("Links", links);
      // setData(links);
      setLoading(false);
    },
    [rockets],
  )

  return [data, loading, error]
}

function useQueryFetch(query) {
  const { data, loading, error } = useQuery(query);
  return [data, loading, error]
}

export default function Home() {
  let [rocketsData, rocketsLoading, rocketsError] = useQueryFetch(ROCKETS_QUERY);
  let [launchesData, launchesLoading, launchesError] = useQueryFetch(launches_QUERY);
  let [images, setImages] = useState({});
  useEffect(() => {
    if (rocketsData && launchesData) {
      let checkedRockets = [];
      let images = new Object();
      //console.log(launchesData);
      launchesData.launches.forEach(launch => {
        let rocketId = launch.rocket.rocket.id;
        if (!checkedRockets.includes(rocketId)) {
          if (launch.links.flickr_images.length > 0) {
            images[rocketId] = launch.links.flickr_images[0];
            checkedRockets.push(rocketId);
          }
        }
      });
      setImages(images);
    }
  }, [rocketsData, launchesData])
  if (rocketsLoading || launchesLoading) return <p>Loading</p>;
  if (rocketsError || launchesError) { console.log("Rocket error", rocketsError, "launches error", launchesError); return <p>ERROR</p>; }
  if (!rocketsData) return <p>Not found</p>;
  return (
    <>
      <ul>
        {
          rocketsData.rockets.map(rocket => {
            return (
              <li key={`rocket__${rocket.id}`}>
                <Link href={`/rocket/${rocket.id}`}>
                  <a>{rocket.name} in {rocket.country}</a>
                </Link>
                <img className='image is-128x128' src={images[rocket.id]} />
              </li>
            );
          })
        }
      </ul>
    </>
  )
}