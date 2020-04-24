import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
import LAUNCHES_QUERY from '../graphql/launches.query';
import ROCKETS_QUERY from '../graphql/rockets.query';
import Link from 'next/link';

const Home = () => {
  // Create a query hook
  const { data, loading, error } = useQuery(ROCKETS_QUERY);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return (
    <>
      Read <Link href="/details"><a>this page!</a></Link>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data.rockets.map(launch => {
          return (
            <li key={`launch__${launch.id}`}>
              <Link href={`/rocket/${launch.id}`}><a>{launch.name}  {launch.country}</a></Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};


export default Home;
