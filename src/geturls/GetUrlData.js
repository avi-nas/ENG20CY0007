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
          urls.map((url) => axios.get(url))
        );
        setDataResponses(
          responses.map((response) =>
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
