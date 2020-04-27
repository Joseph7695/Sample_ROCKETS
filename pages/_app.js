// import React from 'react';
// import App from 'next/app';

import { ApolloProvider } from '@apollo/react-hooks';
import Layout from '../components/layout';

import withData from '../util/apollo-client';
// import Layout from '../components/layout';

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, apollo } = this.props;
//     return (
//       <ApolloProvider client={apollo}>
//         <Component {...pageProps} />
//       </ApolloProvider>
//     );
//   }
// }

// // Wraps all components in the tree with the data provider
// export default withData(MyApp);

// pages/_app.js
import '../sass/mystyles.scss';

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
export default withData(MyApp);
// export default function MyApp({ Component, pageProps }) {
//   return (
//     <ApolloProvider client={apollo}>
//       <Component {...pageProps} />
//     </ApolloProvider>
//   );
// }