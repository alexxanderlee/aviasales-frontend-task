import React from 'react';

import './Ticket.scss';

import { formatPrice, formatInterval, formatDurationTime, formatStopsCount, formatStops } from '../../utils/formatters';

function Ticket({ data }) {

  const getCarrierImgUrl = (carrier) => `https://pics.avs.io/99/36/${carrier}.png`;

  return(
    <div className="ticket" onClick={() => console.log(data)}>
      <div className="ticket__header">
        <div className="ticket__price">{formatPrice(data.price)}</div>
        <img src={getCarrierImgUrl(data.carrier)} alt="carrier logo" className="ticket__carrier-img" />
      </div>
      <div className="ticket__segments">
        {data.segments && data.segments.map(segment => 
          <React.Fragment key={segment.date}>
            <div className="field">
              <div className="field__title">{segment.origin}-{segment.destination}</div>
              <div className="field__value">{formatInterval(segment.date, segment.duration)}</div>
            </div>
            <div className="field">
              <div className="field__title">В пути</div>
              <div className="field__value">{formatDurationTime(segment.duration)}</div>
            </div>
            <div className="field">
              <div className="field__title">{formatStopsCount(segment.stops)}</div>
              <div className="field__value">{formatStops(segment.stops)}</div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default Ticket;