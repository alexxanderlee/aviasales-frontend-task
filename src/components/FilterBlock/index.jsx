import { useEffect } from 'react';

import './FilterBlock.scss'

function FilterBlock({ filterValues, setFilterValues }) {
  const items = [
    { name: 'all', text: 'Все' },
    { name: 'noStops', text: 'Без пересадок' },
    { name: 'oneStop', text: '1 пересадка' },
    { name: 'twoStops', text: '2 пересадки' },
    { name: 'threeStops', text: '3 пересадки' },
  ];

  const setAllFliters = (isChecked) => {
    if (isChecked) {
      setFilterValues({ all: true, noStops: true, oneStop: true, twoStops: true, threeStops: true });
    } else {
      setFilterValues({ all: false, noStops: false, oneStop: false, twoStops: false, threeStops: false });
    }
  };

  const changeFilter = (name, isChecked) => {
    setFilterValues(prevFilterValues => ({
      ...prevFilterValues,
      [name]: isChecked
    }));
  };

  const onChangeInput = (event) => {
    const { name, checked } = event.target;
    if (name === 'all') {
      setAllFliters(checked);
    } else {
      changeFilter(name, checked);
    }
  };

  const checkAllFilters = (filters) => {
    const { all, noStops, oneStop, twoStops, threeStops } = filters;
    if (noStops && oneStop && twoStops && threeStops) {
      if (!all) changeFilter('all', true);
    } else {
      if (all) changeFilter('all', false);
    }
  };

  useEffect(() => checkAllFilters(filterValues), [filterValues]);

  return(
    <div className="filters">
      <div className="filters__title">Количество пересадок</div>
      <div className="filters__list">
        {items && items.map(item => 
          <label key={item.name} className="filters__item">
            <label className="checkbox">
              <input
                type="checkbox"
                className="checkbox__input"
                name={item.name}
                checked={filterValues[item.name]}
                onChange={onChangeInput}
              />
              <span className="checkbox__mark"></span>
              <span className="checkbox__text">{item.text}</span>
            </label>
          </label>
        )}
      </div>
    </div>
  );
}

export default FilterBlock;