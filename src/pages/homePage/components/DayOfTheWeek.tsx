import React from 'react';

const DayOfTheWeek: React.FC = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dayOfWeek: string = currentDate.toLocaleDateString('fr-FR', options);
  const dayOfWeekMajFirstChar: string = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  return <>{dayOfWeekMajFirstChar}</>;
};

export default DayOfTheWeek;
