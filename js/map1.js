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

        async function geojsonFetch() {
            let response = await fetch('assets/sorted_enroll.geojson');
            let enrollData = await response.json();
            let column = 'e_'
            map.on('load', function loadingData() {
                map.addSource('enrollData', {
                    type: 'geojson',
                    data: enrollData
                });

                map.addLayer({
                    'id': 'countyData-layer',
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

            //map.on('mousemove', ({point}) => {
                //const county = map.queryRenderedFeatures(point, {
                    //layers: ['countyData-layer']
                //});
               //document.getElementById('text-escription').innerHTML = county.length ?
                    //`<h3>${county[0].properties.county}, ${county[0].properties.state}</h3><p><strong><em>${county[0].properties.rates}</strong> Cases per 1000 people</em></p>` :
                    //`<p>Hover over a county!</p>`;
            //});
        }

        geojsonFetch();
    }
})();