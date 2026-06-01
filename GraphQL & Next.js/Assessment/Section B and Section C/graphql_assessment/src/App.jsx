import React from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { client } from './section C/sectionCClient';
import SectionC from './section C/SectionC';
import './App.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <SectionC />
      </div>
    </ApolloProvider>
  );
}

export default App;
