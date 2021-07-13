import classnames from 'classnames';

import './SortBlock.scss';

function SortBlock({ sortType, setSortType }) {
  const items = [
    { type: 'cheapest', text: 'Самый дешевый' },
    { type: 'fastest', text: 'Самый быстрый' },
  ];

  const onChangeSort = (type) => setSortType(type);
  
  return(
    <div className="sort-block">
      {items && items.map(item => 
        <div
          key={item.type}
          className={classnames('sort-block__btn', { 'sort-block__btn_active': sortType === item.type })}
          onClick={() => onChangeSort(item.type)}>
            {item.text}
        </div>
      )}
    </div>
  );
}

export default SortBlock;