import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  SyntheticEvent,
} from 'react';
import SearchBar from './components/SearchBar';
import Carousel from './components/Carousel';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const originalData = useRef(data);

  const fetchData = useCallback(async () => {
    const response = await fetch('/api/cars.json');
    const json = await response.json();
    originalData.current = json;

    setData(json);
  }, [setData]);

  const filterData = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      const value = target.value;
      const filteredData = data.filter(
        ({ bodyType }: { bodyType: string }) =>
          bodyType.toLowerCase() === value.toLowerCase()
      );

      if (filteredData.length > 0) {
        setData(filteredData);
      } else {
        setData(originalData.current);
      }
    },
    [data, setData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <SearchBar onChange={filterData} />
      <Carousel data={data} />
    </div>
  );
}

export default App;
