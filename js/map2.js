"use strict";

(function () {

    window.addEventListener("load", init);

    function init() {
        mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 3,
            center: [-91, 39.5],
            projection: 'albers'
        });

        const years = [
            2005,
            2007,
            2009,
            2011,
            2013,
            2015
        ]

        const types = [
            'VERBAL_SAT',
            'MATH_SAT',
            'AVG_ARTS_GPA',
            'AVG_STEM_GPA'
        ]

        const statements = ['percentages of students are in lower score range of Verbal SAT',
                            'percentages of students are in lower score range of Math SAT',
                            'is the average GPA for art classes',
                            'is the average GPA for STEM classes'
                            ];

        function legendWrapper(type) {
            let property
            let color
            let layer
            if (type == 0 || type == 1) {
                property = [
                    20,
                    30,
                    40,
                    50
                ];
                color = [
                    '#f1eef6',
                    '#bdc9e1',
                    '#74a9cf',
                    '#2b8cbe',
                    '#045a8d'
                ]
                layer = [
                    '0%-20%',
                    '21%-30%',
                    '31%-40%',
                    '41%-50%',
                    '>50%'
                ]
            } else {
                property = [
                    3,
                    3.2,
                    3.4,
                    3.6
                ];
                color = [
                    '#ffffd4',
                    '#fed98e',
                    '#fe9929',
                    '#d95f0e',
                    '#993404'
                ];
                layer = [
                    '0-3',
                    '3.1-3.2',
                    '3.3-3.4',
                    '3.5-3.6',
                    '>3.6'
                ];
            }
            let result = [property, color, layer];
            return result;
        }

        function filterBy() {
            let index1 = document.getElementById('slider').value;
            let year = years[index1];
            let index2 = document.getElementById('types').value;
            let type = types[index2];
            let column = 'g_' + String(year) + '_' + type;
            let property = []
            let number = legendWrapper(index2)[0];
            let color = legendWrapper(index2)[1]
            property.push('step');
            property.push(['get', column]);
            for (let i = 0; i < 4; i++) {
                property.push(color[i]);
                property.push(number[i]);
            };
            property.push(color[4]);
            map.setPaintProperty('gradeData-layer', 'fill-color', property);
            document.getElementById('year').textContent = year;
        }

        function legendMaker() {
            let type = document.getElementById('types').value;
            const layers = legendWrapper(type)[2];
            const colors = legendWrapper(type)[1];
            const legend = document.getElementById('legend');
            legend.innerHTML = '';
            let title = document.createElement('h2');
            if (type == 0 || type == 1) {
                title.textContent = 'lower percentage'
            } else {
                title.textContent = 'High School GPA'
            }
            legend.appendChild(title);
            layers.forEach((layer, i) => {
                const color = colors[i];
                const item = document.createElement('div');
                const key = document.createElement('span');
                key.className = 'legend-key';
                key.style.backgroundColor = color;

                const value = document.createElement('span');
                value.innerHTML = `${layer}`;
                item.appendChild(key);
                item.appendChild(value);
                legend.appendChild(item);
            });
        }
        async function geojsonFetch() {
            let response = await fetch('assets/map2.geojson');
            let gradeData = await response.json();

            map.on('load', function loadingData() {
                map.addSource('gradeData', {
                    type: 'geojson',
                    data: gradeData
                });

                map.addLayer({
                    'id': 'gradeData-layer',
                    'type': 'fill',
                    'source': 'gradeData',
                    'paint': {
                        'fill-color': [
                            'step',
                            ['get', 'g_2005_VERBAL_SAT'],
                            '#f1eef6',
                            20,
                            '#bdc9e1',
                            30,
                            '#74a9cf',
                            40,
                            '#2b8cbe',
                            50,
                            '#045a8d'
                        ],
                        'fill-outline-color': '#041C32',
                        'fill-opacity': 0.6,
                    }
                });
                legendMaker()
            });
            filterBy();

            document.getElementById('slider').addEventListener('input', () => {
                filterBy();
            });
            document.getElementById('types').addEventListener('input', () => {
                filterBy();
                legendMaker();
                updateChart();

            });

            map.on('mousemove', ({
                point
            }) => {
                const enroll = map.queryRenderedFeatures(point, {
                    layers: ['gradeData-layer']
                });
                let index1 = document.getElementById('slider').value;
                let year = years[index1];
                let index2 = document.getElementById('types').value;
                let type = types[index2];
                let column = 'g_' + String(year) + '_' + type;

                document.getElementById('text-description').innerHTML = enroll.length ?
                    `<h3>${enroll[0].properties.NAME}</h3><p><strong><em>${enroll[0].properties[column].toFixed(2)}</strong>${statements[index2]}</em></p>` :
                    `<p>Hover over a State!</p>`;
            });
        }

        geojsonFetch();
        updateChart();

        function updateChart() {
            let chart = document.querySelector('#my_dataviz');
            let title = document.querySelector('#chart h2');
            chart.innerHTML = '';
            let type = document.getElementById('types').value;
            let group = ['Median_Verbal_SAT', 'Median_Math_SAT', 'Median_Arts_GPA', 'Median_STEM_GPA'];
            let column = group[type];
            let domain = [3.0, 3.7];
            if (type == 0) {
                title.innerHTML = 'Median of 200-500 Verbal SAT Score Percentage';
                domain = [35, 45];
            } else if (type == 1) {
                title.innerHTML = 'Median of 200-500 Math SAT Score Percentage';
                domain = [35, 45];
            } else if (type == 2) {
                title.innerHTML = 'USA Median Art Class GPA';
                domain = [3.0, 3.7];
            } else {
                title.innerHTML = 'USA Median STEM Class GPA';
            }
            var margin = {
                    top: 10,
                    right: 30,
                    bottom: 30,
                    left: 60
                },
                width = 330 - margin.left - margin.right,
                height = 250 - margin.top - margin.bottom;

            var svg = d3.select("#my_dataviz")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

            //Read the data
            d3.csv("assets/chart.csv",


                // Now I can use this dataset:
                function (data) {

                    // Add X axis --> it is a Year format
                    var x = d3.scaleLinear()
                        .domain([2005, 2015])
                        .range([0, width]);
                    svg.append("g")
                        .attr("transform", "translate(0," + height + ")")
                        .call(d3.axisBottom(x))
                        .selectAll("text")
                        .attr("transform", "translate(-10,10)rotate(-45)")

                    // Add Y axis
                    var y = d3.scaleLinear()
                        .domain(domain)
                        .range([height, 0]);
                    svg.append("g")
                        .call(d3.axisLeft(y));

                    // Add the line
                    svg.append("path")
                        .datum(data)
                        .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1.5)
                        .attr("d", d3.line()
                            .x(function (d) {
                                return x(d.Year)
                            })
                            .y(function (d) {
                                return y(d[column])
                            })
                        )

                    // create a tooltip
                    var Tooltip = d3.select("#my_dataviz")
                        .append("div")
                        .style("opacity", 0)
                        .attr("class", "tooltip")
                        .style("background-color", "white")
                        .style("border", "solid")
                        .style("border-width", "2px")
                        .style("border-radius", "5px")
                        .style("padding", "5px")

                    // Three function that change the tooltip when user hover / move / leave a cell
                    var mouseover = function (d) {
                        Tooltip
                            .style("opacity", 1)
                    }
                    var mousemove = function (d) {
                        Tooltip
                            .html(`Exact ${column}: ` + d[column])
                            .style("left", (d3.mouse(this)[0] + 70) + "px")
                            .style("top", (d3.mouse(this)[1]) + "px")
                    }
                    var mouseleave = function (d) {
                        Tooltip
                            .style("opacity", 0)
                    }

                    // Add the points
                    svg
                        .append("g")
                        .selectAll("dot")
                        .data(data)
                        .enter()
                        .append("circle")
                        .attr("class", "myCircle")
                        .attr("cx", function (d) {
                            return x(d.Year)
                        })
                        .attr("cy", function (d) {
                            return y(d[column])
                        })
                        .attr("r", 8)
                        .attr("stroke", "#69b3a2")
                        .attr("stroke-width", 3)
                        .attr("fill", "white")
                        .on("mouseover", mouseover)
                        .on("mousemove", mousemove)
                        .on("mouseleave", mouseleave)
                })
        }
    }
})();