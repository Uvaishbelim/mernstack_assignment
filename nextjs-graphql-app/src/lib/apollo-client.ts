import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      // We use absolute URI on server and relative URI on client
      uri: typeof window === 'undefined' ? 'http://localhost:3000/api/graphql' : '/api/graphql',
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            missions: {
              // Replace rather than merge list fields for status updates & additions
              merge(existing, incoming) {
                return incoming;
              },
            },
          },
        },
      },
    }),
  });
};

export const client = createApolloClient();
