import { lightFormat, addMinutes } from 'date-fns';

export const formatPrice = (number) => {
  const formattedNumber = number.toLocaleString('ru-RU', { style: 'decimal' });
  return `${formattedNumber} Р`;
};

export const formatInterval = (date, duration) => {
  const start = lightFormat(new Date(date), 'HH:mm');
  const end = lightFormat(addMinutes(new Date(date), duration), 'HH:mm')
  return `${start} - ${end}`
};

export const formatDurationTime = (minutes) => {
  const HH = Math.floor(minutes / 60);
  const mm = minutes % 60;
  return `${HH}ч ${mm}м`
};

export const formatStops = (stops) => stops.length > 0 ? stops.join(', ') : '-';

export const formatStopsCount = (stops) => {
  const number = stops.length;
  const cases = ['пересадок', 'пересадка', 'пересадки'];

  if (number % 100 > 10 && number % 100 < 20) return `${number} ${cases[0]}`;
  if (number % 10 > 1 && number % 10 < 5) return `${number} ${cases[2]}`;
  if (number % 10 === 1) return `${number} ${cases[1]}`;
  return `${number} ${cases[0]}`;
};