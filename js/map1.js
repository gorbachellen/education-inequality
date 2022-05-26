"use strict";

(function() {

    window.addEventListener("load", init);

    function init() {
        mapboxgl.accessToken =
            'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            zoom: 4,
            center: [-100, 38],
            projection: 'albers'
        });

        const years = [
            1995,
            2000,
            2005,
            2010,
            2015
        ]

        const colors = {
            'enroll' : [],
            'revenue' : []
        }

        const layers = {}

        const types = [
            'ENROLL',
            'TOTAL_REVENUE',
            'TOTAL_EXPENDITURE',
        ]

        function legendWrapper(type) {
            property = []
            if (type == 0) { //enroll
                print()
            } else if (type == 1) {
                print()
            } else {
                print()
            }

        }

        function filterBy() {
            let index1 = document.getElementById('slider').value;
            let year = years[index1];
            let index2 = document.getElementById('types').value;
            let type = types[index2];
            let column = 'e_' + String(year) + '_' + type;
            let property = []
            property.push('step');
            property.push(['get', column]);
            property.push('#feedde');
            property.push(200000);
            property.push('#fdbe85');
            property.push(500000);
            property.push('#fd8d3c');
            property.push(1000000);
            property.push('#e6550d');
            property.push(2000000);
            property.push('#a63603');
            map.setPaintProperty('enrollData-layer', 'fill-color', property);
            document.getElementById('year').textContent = year;
        }

        async function geojsonFetch() {
            let response = await fetch('assets/sorted_enroll.geojson');
            let enrollData = await response.json();

            map.on('load', function loadingData() {
                map.addSource('enrollData', {
                    type: 'geojson',
                    data: enrollData
                });

                map.addLayer({
                    'id': 'enrollData-layer',
                    'type': 'fill',
                    'source': 'enrollData',
                    'paint': {
                        'fill-color': [
                            'step',
                            ['get', 'e_1995_ENROLL'],
                            '#feedde',
                            200000,
                            '#fdbe85',
                            500000,
                            '#fd8d3c',
                            1000000,
                            '#e6550d',
                            2000000,
                            '#a63603'
                        ],
                        'fill-outline-color': '#041C32',
                        'fill-opacity': 0.9,
                    }
                });

                const layers = [
                    '0-200000',
                    '200000-500000',
                    '500000-1000000',
                    '1000000-2000000',
                    '>2000000'
                ];
                const colors = [
                    '#feedde90',
                    '#fdbe8590',
                    '#fd8d3c90',
                    '#e6550d90',
                    '#a6360390'
                ];

                const legend = document.getElementById('legend');


                layers.forEach((layer, i) => {
                    const color = colors[i];
                    const item = document.createElement('div');
                    const key = document.createElement('span');
                    key.className = 'legend-key';
                    key.style.backgroundColor = color;

                    const value = document.createElement('span');
                    value.innerHTML = `${layer}`;
                    item.appendChild(value);
                    item.appendChild(key);
                    legend.appendChild(item);
                });
            });
            filterBy(0);

            document.getElementById('slider').addEventListener('input', () => {
                filterBy();
            });
            document.getElementById('types').addEventListener('input', () => {
                filterBy();
            });
            map.on('mousemove', ({point}) => {
                const enroll = map.queryRenderedFeatures(point, {
                    layers: ['enrollData-layer']
                });
                let index1 = document.getElementById('slider').value;
                let year = years[index1];
                let index2 = document.getElementById('types').value;
                let type = types[index2];
                let column = 'e_' + String(year) + '_' + type;
                document.getElementById('text-description').innerHTML = enroll.length ?
                    `<h3>${enroll[0].properties.NAME}</h3><p><strong><em>${enroll[0].properties[column]}</strong> students are enrolled</em></p>` :
                `<p>Hover over a county!</p>`;
            });
        }

        geojsonFetch();
    }
})();