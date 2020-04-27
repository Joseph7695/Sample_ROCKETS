import { ApolloProvider } from '@apollo/react-hooks';
import Layout from '../components/layout';

import withData from '../util/apollo-client';
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