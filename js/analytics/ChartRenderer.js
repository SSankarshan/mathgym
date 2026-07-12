let accuracyChart = null;

let speedChart = null;

let weakTablesChart = null;

let weakMultipliersChart = null;

export function renderCharts(

    trend,

    weaknesses,

    mode

) {

    renderAccuracyChart(

        trend

    );

    renderSpeedChart(

        trend

    );

    const weakTablesSection =
        document.getElementById(
            "weakTablesSection"
        );

    const weakMultipliersSection =
        document.getElementById(
            "weakMultipliersSection"
        );

    if (mode === "TABLES") {

        weakTablesSection.hidden = false;

        weakMultipliersSection.hidden = false;

        renderWeakTablesChart(

            weaknesses.weakTables

        );

        renderWeakMultipliersChart(

            weaknesses.weakMultipliers

        );

    }
    else {

        weakTablesSection.hidden = true;

        weakMultipliersSection.hidden = true;

        if (weakTablesChart) {

            weakTablesChart.destroy();

            weakTablesChart = null;

        }

        if (weakMultipliersChart) {

            weakMultipliersChart.destroy();

            weakMultipliersChart = null;

        }

    }

}

function renderAccuracyChart(

    trend

) {

    const ctx =
        document
            .getElementById(
                "accuracyChart"
            )
            .getContext("2d");

    if (accuracyChart) {

        accuracyChart.destroy();

    }

    accuracyChart =
        new Chart(

            ctx,

            {

                type: "line",

                data: {

                    labels:

                        trend.map(

                            t =>

                                t.date

                        ),

                    datasets: [

                        {

                            label:

                                "Accuracy (%)",

                            data:

                                trend.map(

                                    t =>

                                        t.accuracy

                                ),

                            borderColor:

                                "#2563eb",

                            backgroundColor:

                                "#2563eb22",

                            fill: true,

                            tension: 0.3

                        }

                    ]

                },

                options: {

                    responsive: true,

                    plugins: {

                        title: {

                            display: true,

                            text:

                                "Accuracy Trend"

                        }

                    },

                    scales: {

                        y: {

                            min: 0,

                            max: 100,

                            title: {

                                display: true,

                                text:

                                    "Accuracy (%)"

                            }

                        }

                    }

                }

            }

        );

}

function renderSpeedChart(

    trend

) {

    const ctx =
        document
            .getElementById(
                "speedChart"
            )
            .getContext("2d");

    if (speedChart) {

        speedChart.destroy();

    }

    speedChart =
        new Chart(

            ctx,

            {

                type: "line",

                data: {

                    labels:

                        trend.map(

                            t =>

                                t.date

                        ),

                    datasets: [

                        {

                            label:

                                "Questions / Minute",

                            data:

                                trend.map(

                                    t =>

                                        60000 /

                                        t.averageTimeMs

                                ),

                            borderColor:

                                "#16a34a",

                            backgroundColor:

                                "#16a34a22",

                            fill: true,

                            tension: 0.3

                        }

                    ]

                },

                options: {

                    responsive: true,

                    plugins: {

                        title: {

                            display: true,

                            text:

                                "Solving Speed"

                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            title: {

                                display: true,

                                text:

                                    "Questions / Minute"

                            }

                        }

                    }

                }

            }

        );

}

function renderWeakTablesChart(

    weakTables

) {

    const ctx =
        document
            .getElementById(
                "weakTablesChart"
            )
            .getContext("2d");

    if (weakTablesChart) {

        weakTablesChart.destroy();

    }

    weakTablesChart =
        new Chart(

            ctx,

            {

                type: "bar",

                data: {

                    labels:

                        weakTables.map(

                            t =>

                                t.key

                        ),

                    datasets: [

                        {

                            label:

                                "Accuracy (%)",

                            data:

                                weakTables.map(

                                    t =>

                                        t.accuracy

                                ),

                            backgroundColor:

                                "#dc2626"

                        }

                    ]

                },

                options: {

                    indexAxis: "y",

                    responsive: true,

                    scales: {

                        x: {

                            min: 0,

                            max: 100

                        }

                    }

                }

            }

        );

}

function renderWeakMultipliersChart(

    weakMultipliers

) {

    const ctx =
        document
            .getElementById(
                "weakMultipliersChart"
            )
            .getContext("2d");

    if (weakMultipliersChart) {

        weakMultipliersChart.destroy();

    }

    weakMultipliersChart =
        new Chart(

            ctx,

            {

                type: "bar",

                data: {

                    labels:

                        weakMultipliers.map(

                            t =>

                                "×" + t.key

                        ),

                    datasets: [

                        {

                            label:

                                "Accuracy (%)",

                            data:

                                weakMultipliers.map(

                                    t =>

                                        t.accuracy

                                ),

                            backgroundColor:

                                "#f59e0b"

                        }

                    ]

                },

                options: {

                    indexAxis: "y",

                    responsive: true,

                    scales: {

                        x: {

                            min: 0,

                            max: 100

                        }

                    }

                }

            }

        );

}