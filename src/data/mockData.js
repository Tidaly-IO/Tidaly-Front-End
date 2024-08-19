export const generateWeekBarData = (weeks, pricem3) => {
    if (!Array.isArray(weeks) || !weeks.length) {
        return [];
    }
    console.log("weeks", weeks);
    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const pricePerLiter = pricem3 / 1000;

   // console.log("dsd", weeks);
    if (pricem3 === 0) {
        pricem3 = 4;
    }

    return weeks.map((dayData, index) => ({
        time: daysOfWeek[index],
        "Eau en M3": dayData / 1000,
        //"Prix en €": dayData / 1000 * pricem3 //arrondis à 2 chiffres après la virgule, pour le prix
        "Prix en €": Math.round(dayData / 1000 * pricem3 * 100) / 100
    }));
};

export const generateYearsStatsBarData = (years, pricem3) => {
    if (!Array.isArray(years) || !years.length) {
        return [];
    }
    console.log("years", years);
    const monthOfYears = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    const pricePerLiter = pricem3 / 1000;

    console.log(pricem3)

    // console.log("dsd", weeks);
    if (pricem3 === 0) {
        pricem3 = 4;
    }

    return years.map((monthData, index) => ({
        time: monthOfYears[index],
        "Eau en M3": monthData / 1000,
        //"Prix en €": dayData / 1000 * pricem3 //arrondis à 2 chiffres après la virgule, pour le prix
        "Prix en €": Math.round(monthData / 1000 * pricem3 * 100) / 100
    }));
};

export const generateWeeksStatsBarData = (weeks, pricem3) => {
    if (!Array.isArray(weeks) || !weeks.length) {
        return [];
    }
    const weekLabels = ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4", "Semaine 5"];
    const pricePerLiter = pricem3 / 1000;

    // Utiliser une valeur par défaut si pricem3 est égal à 0
    if (pricem3 === 0) {
        pricem3 = 4;
    }

    console.log("weeks", weeks);

    return weeks.map((weekData, index) => ({
        time: weekLabels[index],
        "Eau en M3": weekData / 1000, // Convertir en m³
        "Prix en €": Math.round(weekData / 1000 * pricem3 * 100) / 100 // Calculer et arrondir le prix en €
    }));
};

export const mockPieData = [
    {
        id: "hack",
        label: "hack",
        value: 239,
        color: "hsl(104, 70%, 50%)",
    },
    {
        id: "make",
        label: "make",
        value: 170,
        color: "hsl(162, 70%, 50%)",
    },
    {
        id: "go",
        label: "go",
        value: 322,
        color: "hsl(291, 70%, 50%)",
    },
    {
        id: "lisp",
        label: "lisp",
        value: 503,
        color: "hsl(229, 70%, 50%)",
    },
    {
        id: "scala",
        label: "scala",
        value: 584,
        color: "hsl(344, 70%, 50%)",
    },
];