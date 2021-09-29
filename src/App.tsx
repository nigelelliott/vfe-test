import React, { useState, useEffect, useCallback } from 'react';
import Carousel from './components/Carousel';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await fetch('/api/cars.json');
    const json = await response.json();

    setData(json);
  }, [setData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <Carousel data={data} />
    </div>
  );
}

export default App;
