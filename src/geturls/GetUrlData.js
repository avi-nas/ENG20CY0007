import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetUrlData.css'; // Import the CSS file

const GetUrlData = () => {
  const [urls, setUrls] = useState([]);
  const [dataResponses, setDataResponses] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlValues = urlParams.getAll('url');
    setUrls(urlValues);

    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          urls.map((url) => {
            return Promise.race([
              axios.get(url),
              new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 500))
            ]);
          })
        );
    
        // Filter out the responses that are not timeout errors
        const validResponses = responses.filter((response) => !(response instanceof Error && response.message === 'Timeout'));
    
        setDataResponses(
          validResponses.map((response) =>
            response.data.numbers.sort((a, b) => a - b).filter((value, index, self) => self.indexOf(value) === index)
          )
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, [urls]);

  return (
    <div className="data-container">
      <h2>Data from URLs:</h2>
      <ul>
        {dataResponses.map((numbers, index) => (
          <li key={index}>{JSON.stringify(numbers)}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetUrlData;
