import React from 'react';

const DayOfTheWeek = () => {
  const currentDate = new Date();
  const options = { weekday: 'long' };
  const dayOfWeek = currentDate.toLocaleDateString('fr-FR', options);
  const dayOfWeekMajFirstChar = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
  return `${dayOfWeekMajFirstChar}`;
};

export default DayOfTheWeek;