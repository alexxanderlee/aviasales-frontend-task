const averageDuration = (segments) => segments
  .reduce((acc, segment) => acc + segment.duration, 0) / segments.length;

const sortTickets = (tickets, sortType) => {
  const result = [...tickets];

  if (sortType === 'cheapest') {
    result.sort((a, b) => a.price - b.price);
  }
  if (sortType === 'fastest') {
    result.sort((a, b) => averageDuration(a.segments) - averageDuration(b.segments));
  }
  return result;
};

export default sortTickets;