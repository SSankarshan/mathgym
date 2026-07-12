let accuracyChart = null;

let speedChart = null;

let weakItemsChart = null;

export function renderCharts(

    trend,

    weakItems,

    mode

) {

    renderAccuracyChart(

        trend

    );

    renderSpeedChart(

        trend

    );

    renderWeakItemsChart(

        weakItems
    );



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

function renderWeakItemsChart(

    weakItems

) {

    const ctx =

        document

            .getElementById(

                "weakItemsChart"

            )

            .getContext(

                "2d"

            );

    if (

        weakItemsChart

    ) {

        weakItemsChart

            .destroy();

    }

    weakItemsChart =

        new Chart(

            ctx,

            {

                type: "bar",

                data: {

                    labels:

                        weakItems

                            .slice(

                                0,

                                10

                            )

                            .map(

                                x =>

                                    x.key

                            ),

                    datasets: [

                        {

                            label:

                                "Accuracy",

                            data:

                                weakItems

                                    .slice(

                                        0,

                                        10

                                    )

                                    .map(

                                        x =>

                                            x.accuracy

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