import React from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
    }
  }
`;

const LaunchesComponent = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Country List</h2>
      {data.countries.map((country) => (
        <div key={country.code}>
          <h3>{country.name}</h3>
          <p>Code: {country.code}</p>
          <p>Capital: {country.capital || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default LaunchesComponent;