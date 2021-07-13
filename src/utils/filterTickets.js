const getFilters = (filterValues) => {
  const result = [];
  if (filterValues.noStops === true) result.push(0);
  if (filterValues.oneStop === true) result.push(1);
  if (filterValues.twoStops === true) result.push(2);
  if (filterValues.threeStops === true) result.push(3);
  return result;
};

const sumStopsCount = (segments) => segments.reduce((acc, { stops }) => acc + stops.length, 0);

const filterTickets = (tickets, filterValues) => {
  const result = [...tickets];
  if (filterValues.all) {
    return result;
  }

  const filters = getFilters(filterValues);
  return result.filter((ticket) => {
    const stopsCount = sumStopsCount(ticket.segments);
    if (filters.includes(stopsCount)) {
      return true;
    }
    return false;
  });
};

export default filterTickets;