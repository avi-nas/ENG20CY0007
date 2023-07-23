import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetUrlData = () => {
  const [urls, setUrls] = useState([]);
  const [dataResponses, setDataResponses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const validResponses = await Promise.all(
          urls.map(async (url) => {
            try {
              const response = await Promise.race([
                axios.get(url),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 500))
              ]);
              return response.data.numbers;
            } catch (error) {
              return null;
            }
          })
        );

        const filteredResponses = validResponses.filter((response) => response !== null);
        setDataResponses(filteredResponses);
      } catch (error) {
        setError(error);
      }
    };

    if (urls.length > 0) {
      fetchData();
    }
  }, [urls]);

  const handleFetchData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlValues = urlParams.getAll('url');
    setUrls(urlValues);
  };

 return (
    <div className="data-container">
      <h2>Data from URLs:</h2>
      <button className="fetch-button" onClick={handleFetchData}>Fetch Data</button>
      {error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
    
          dataResponses.map((numbers, index) => (
            <h3 key={index}>{numbers.sort((a, b) => a - b).filter((value, index, self) => self.indexOf(value) === index).join(', ')}</h3>
          ))
        
      )}
    </div>
  );
export default GetUrlData;
