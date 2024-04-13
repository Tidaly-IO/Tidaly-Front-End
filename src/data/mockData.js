export const generateWeekBarData = (weeks, pricem3) => {
    if (!Array.isArray(weeks) || !weeks.length) {
        return [];
    }

    const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    const pricePerLiter = pricem3 / 1000;

    return weeks.map((dayData, index) => ({
        country: daysOfWeek[index],
        "Eau en L": dayData,
        "Prix en €": dayData * pricePerLiter,
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