import Chart from 'chart.js/auto';

Chart.defaults.plugins.legend.display = false;
Chart.defaults.scale.category = Chart.defaults.scale.linear;

export const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true
    }
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Historique de la consommation d'eau"
    }
  }
};

export const dataCopy = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  datasets: [
    {
      label: "Consommation en litres d'eau",
      data: [65, 59, 80, 21, 100, 165, 144],
    }
  ]
};

export function getCurrentDate(separator = '') {
  const newDate = new Date();
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();

  const dateFormatZeroBegin = month.toString().length === 1 ? '0' + month.toString() : month.toString();
  const monthFormatZeroBegin = date.toString().length === 1 ? '0' + date.toString() : date.toString();

  return `${dateFormatZeroBegin} / ${monthFormatZeroBegin} /  ${year} `;
}

export function getIndexDay() {
  let index = 0;
  const currentDate = new Date();
  const options = { weekday: 'long' };
  const dayOfWeek = currentDate.toLocaleDateString('fr-FR', options);
  const dayOfWeekMajFirstChar = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  switch (dayOfWeekMajFirstChar) {
    case 'Lundi':
      index = 0;
      break;
    case 'Mardi':
      index = 1;
      break;
    case 'Mercredi':
      index = 2;
      break;
    case 'Jeudi':
      index = 3;
      break;
    case 'Vendredi':
      index = 4;
      break;
    case 'Samedi':
      index = 5;
      break;
    case 'Dimanche':
      index = 6;
      break;
    default:
      index = 0;
  }

  return index;
}
