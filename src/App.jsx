import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.scss';

import logoSvg from './assets/images/logo.svg';
import {
  TicketList,
  SortBlock,
  FilterBlock,
} from './components';

function App() {
  const sortDefaultType = 'cheapest';
  const filterDefaultValues = {
    all: true,
    noStops: true,
    oneStop: true,
    twoStops: true,
    threeStops: true,
  };

  const [tickets, setTickets] = useState();
  const [sortType, setSortType] = useState(sortDefaultType);
  const [filterValues, setFilterValues] = useState(filterDefaultValues);
  const [searchStatus, setSearchStatus] = useState();
  const [error, setError] = useState();

  const fetchSearchId = async () => {
    try {
      const response = await axios.get('https://front-test.beta.aviasales.ru/search');
      return response.data.searchId;

    } catch(error) {
      const { status, data } = error.response;
      console.warn(error.response);
      setError({ status, data });
      setSearchStatus('error');
    }
  };

  const fetchTickets = async (searchId) => {
    try {
      const response = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId}`);
      const { tickets, stop } = response.data;
      setTickets(prevTickets => [
        ...prevTickets,
        ...tickets.slice(0, 5)
      ]);

      if (stop) {
        setSearchStatus('success');
      } else {
        await fetchTickets(searchId);
      }
    } catch(error) {
      const { status, data } = error.response;
      if (status === 500) {
        await fetchTickets(searchId);
      } else {
        console.warn(error.response);
        setError({ status, data });
        setSearchStatus('error');
      }
    }
  };

  const fetchData = async () => {
    setTickets([]);
    setError({});
    setSearchStatus('loading');
    const searchId = await fetchSearchId();
    await fetchTickets(searchId);
  };

  useEffect(() => fetchData(), []);

  let content;
  if (searchStatus === 'loading') {
    content = <div className="loading-block">Поиск билетов...</div>;
  }
  if (searchStatus === 'success') {
    content = <TicketList items={tickets} sortType={sortType} filterValues={filterValues} />;
  }
  if (searchStatus === 'error') {
    content = (
      <div className="error-block">
        <div>Ошибка {error.status}!</div>
        <div>"{error.data}"</div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <img src={logoSvg} alt="Logotype" className="header__logo" />
      </header>

      <div className="container">
        <div className="sidebar">
          <FilterBlock
            filterValues={filterValues}
            setFilterValues={setFilterValues}
          />
        </div>
        <div className="content">
          <SortBlock
            sortType={sortType}
            setSortType={setSortType}
          />
          {content}
        </div>
      </div>
    </div>
  );
}

export default App;
