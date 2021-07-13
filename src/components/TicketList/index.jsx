import React, { useState, useEffect } from 'react';
import classnames from 'classnames';

import './TicketList.scss';

import { Ticket } from '../../components';
import sortTickets from '../../utils/sortTickets';
import filterTickets from '../../utils/filterTickets';

function TicketList({ items, sortType, filterValues }) {
  const [ticketsCountOnPage, setTicketsCountOnPage] = useState(5);
  const [tickets, setTickets] = useState();

  const handleMoreTickets = () => {
    const newCount = ticketsCountOnPage + 5 <= tickets.length
      ? ticketsCountOnPage + 5
      : tickets.length;
    setTicketsCountOnPage(newCount);
  };

  useEffect(() => {
    const filteredTickets = filterTickets(items, filterValues);
    const sortedTickets = sortTickets(filteredTickets, sortType);
    setTickets(sortedTickets);
  }, [filterValues]);

  useEffect(() => {
    if (tickets) {
      const sortedTickets = sortTickets(tickets, sortType);
      setTickets(sortedTickets);
    }
  }, [sortType]);

  return(
    <div className="ticket-list">
      {tickets && tickets.length > 0
        ? <React.Fragment>
            <div className="ticket-list__wrapper">
              {tickets.slice(0, ticketsCountOnPage)
                .map(ticket => <Ticket key={ticket.carrier + ticket.price} data={ticket} />)}
            </div>
            <button
              className={classnames('ticket-list__btn', { 'ticket-list__btn_hidden': ticketsCountOnPage >= tickets.length })}
              onClick={handleMoreTickets}>
                Показать ещё
            </button>
          </React.Fragment>
        : <div className="ticket-list__no-tickets">Билеты не найдены :(</div>}
    </div>
  );
}

export default TicketList;