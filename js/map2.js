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
            2003,
            2005,
            2007,
            2009,
            2011,
            2013,
            2015
        ]

        const types = [
        ]

        function filterBy(value) {
            let year = years[value]
            let column = 'g_' + String(year) + '_AVG_READING_4_SCORE';
            let property = []
            property.push('step');
            property.push(['get', column]);
            property.push('#feedde');
            property.push(220);
            property.push('#fdbe85');
            property.push(240);
            property.push('#fd8d3c');
            property.push(260);
            property.push('#e6550d');
            property.push(280);
            property.push('#a63603');
            map.setPaintProperty('gradeData-layer', 'fill-color', property);
            document.getElementById('year').textContent = year;
        }

        async function geojsonFetch() {
            let response = await fetch('assets/sorted_grades.geojson');
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
                            ['get', 'g_2003_AVG_READING_4_SCORE'],
                            '#feedde',
                            220,
                            '#fdbe85',
                            240,
                            '#fd8d3c',
                            260,
                            '#e6550d',
                            280,
                            '#a63603'
                        ],
                        'fill-outline-color': '#041C32',
                        'fill-opacity': 0.9,
                    }
                });

                const layers = [
                    '220-234',
                    '235-249',
                    '250-264',
                    '265-279',
                    '280-300'
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

            document.getElementById('slider').addEventListener('input', (e) => {
                const year = parseInt(e.target.value, 10);
                filterBy(year);
            });
            //map.on('mousemove', ({point}) => {
                //const enroll = map.queryRenderedFeatures(point, {
                    //layers: ['enrollData-layer']
                //});
               //document.getElementById('text-escription').innerHTML = county.length ?
                    //`<h3>${county[0].properties.county}, ${county[0].properties.state}</h3><p><strong><em>${county[0].properties.rates}</strong> Cases per 1000 people</em></p>` :
                    //`<p>Hover over a county!</p>`;
            //});
        }

        geojsonFetch();
    }
})();