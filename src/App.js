import React, {useEffect, useRef, useState} from 'react';
import Coin from './Coin';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const searchRef = useRef();

  const fetchData = async () => {
    await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    )
      .then((response) => response.json())
      .then((data) => {
        setCoins(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = () => {
    setSearch(searchRef.current.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder="Search"
            onChange={handleChange}
            value={search}
            ref={searchRef}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.market_cap}
            price={coin.current_price}
          />
        );
      })}
    </div>
  );
};

export default App;
