import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/react-hooks';
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
      <section className="section">
        <div className="container">
          <h1 className="title">Hello World from <a href="https://nextjs.org/">Next.js</a> and <a href="https://bulma.io/">Bulma</a>!</h1>
        </div>
      </section>
    </>
  );
};


export default Home;
