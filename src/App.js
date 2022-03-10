import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import {
  useQuery,
  gql,
} from "@apollo/client";

const App = () => {
  const [dataToggle, setDataToggle] = React.useState(false);

  const GET_CITIES = gql`
    query GetCities {
      cities {
        name,
        country{name},
      } 
    }`;

    const GET_COMPANIES = gql`
    query GetCompanies {
      companies {
        name,
        websiteUrl,
      } 
    }`;

  // function to switch dataToggle's boolean state
  const handleClick = () => {
    setDataToggle(!dataToggle);
  }

  // returns either city or company data depending on dataToggle's state
  const renderedData = (dataCities, dataCompanies) => {
    console.log(dataCompanies);
    if (dataToggle){
      return (
        <div>
          <h2>Cities Data</h2>
          <table>
            <tbody>
              { dataCities.cities.map((city, index) => 
                <tr key={index}>
                  <td>{city.name}</td>
                  <td>{city.country.name}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Companies Data</h2>
          <table>
            <tbody>
              { dataCompanies.companies.map((company, index) => 
                <tr key={index}>
                  <td>{company.name}</td>
                  <td>{company.websiteUrl}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }
  }

  // two queries to gather required data 
  const { loading: queryCityLoading, error: queryCityError, data: queryCityData } = useQuery(GET_CITIES);
  const { loading: queryCompLoading, error: queryCompError, data: queryCompData } = useQuery(GET_COMPANIES);

  if (queryCityLoading || queryCompLoading) return <p>Loading....</p>;
    else if (queryCityError || queryCompError) return <p>Error...</p>
    else {
      return (
        <div className="App">
          <button onClick={handleClick}>Change dataset</button>
          <div>{renderedData(queryCityData, queryCompData)}</div>
        </div>
      )
    }
}

export default App;
