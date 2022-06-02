"use strict";

(function () {

    window.addEventListener("load", init);

    function init() {
        mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 3.8,
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

        const statements = ['']

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
            console.log(number)
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

        function legendMaker(){
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
                legendMaker()
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
    }
})();