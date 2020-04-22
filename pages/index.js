import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import LAUNCHES_QUERY from '../graphql/launches.query';

const Home = () => {
  // Create a query hook
  const { data, loading, error } = useQuery(LAUNCHES_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  console.log(data);
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data.launchesPast.map(launch => {
          return <li key={`launch__${launch.id}`}>{launch.mission_name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Home;
