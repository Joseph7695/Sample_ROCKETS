import React from 'react';
import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';

import withData from '../util/apollo-client';
import Layout from '../components/layout';

class MyApp extends App {
  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <Layout>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Layout>
    );
  }
}

// Wraps all components in the tree with the data provider
export default withData(MyApp);
