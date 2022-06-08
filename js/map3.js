"use strict";

(function () {

	window.addEventListener("load", init);

	function init() {
		let button = document.querySelector('button');
		button.addEventListener('click', () => {
			let intro = document.getElementById('intro');
			intro.classList.toggle('hidden');
			if (intro.classList.contains('hidden')) {
				button.innerHTML = 'show';
			} else {
				button.innerHTML = 'hide';
			}
		})
		mapboxgl.accessToken =
			'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
		let map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/dark-v10',
			zoom: 8.5,
			center: [-121.8, 47.46],
			projection: 'albers'
		});

		const ap_number = [6, 12, 18, 24];
		const colors = ['rgb(254,204,92)', 'rgb(253,141,60)', 'rgb(227,26,28)', 'rgb(200,0,38)'];
		const radii = [3, 9, 15, 21];

		const apProperty = 'sorted Sheet1_SCH_APCOURSES'
		map.on('load', () => {
			map.addSource('ap', {
				type: 'geojson',
				data: 'assets/KingCountyAp.geojson'
			});

			map.addSource('demographics', {
				type: 'geojson',
				data: 'assets/KingCountyDemographics.geojson'
			});

			map.addLayer({
				'id': 'KingCounty-layer',
				'type': 'fill',
				'source': 'demographics',
				'paint': {
					'fill-color': [
						'step',
						['get', 'MHHI1'],
						'#f0f9e8',
						40000,
						'#bae4bc',
						80000,
						'#7bccc4',
						120000,
						'#43a2ca',
						160000,
						'#0868ac'
					],
					'fill-outline-color': '#041C32',
					'fill-opacity': 0.9,
				}
			});

			const layers = [
				'0-40',
				'41-80',
				'81-120',
				'121-160',
				'>161'
			];
			const colors_layer = [
				'#f0f9e890',
				'#bae4bc90',
				'#7bccc490',
				'#43a2ca90',
				'#0868ac90'
			];
			map.addLayer({
				'id': 'ap-point',
				'type': 'circle',
				'source': 'ap',
				'minzoom': 4,
				'maxzoom': 12,
				'buffer': 512,
				'paint': {
					'circle-radius': {
						'property': apProperty,
						'stops': [
							[{
								zoom: 4,
								value: ap_number[0]
							}, radii[0]],
							[{
								zoom: 4,
								value: ap_number[1]
							}, radii[1]],
							[{
								zoom: 4,
								value: ap_number[2]
							}, radii[2]],
							[{
								zoom: 4,
								value: ap_number[3]
							}, radii[3]]
						]
					},
					'circle-color': {
						'property': apProperty,
						'stops': [
							[ap_number[0], colors[0]],
							[ap_number[1], colors[1]],
							[ap_number[2], colors[2]],
							[ap_number[3], colors[3]]
						]
					},
					'circle-stroke-color': 'white',
					'circle-stroke-width': 0.5,
					'circle-opacity': 0.9
				}
			});

			map.on('click', 'ap-point', (event) => {
				var school_info = `<strong>School:</strong> ${event.features[0].properties.NAME}<br>`
				school_info += `<strong>City:</strong> ${event.features[0].properties.CITY}<br>`
				school_info += `<strong>Address:</strong> ${event.features[0].properties.STREET}<br>`
				if (event.features[0].properties[apProperty] == null) {
					school_info += `<strong>Ap Courses:</strong> Not recorded<br>`
				} else {
					school_info += `<strong>Ap Courses:</strong> ${event.features[0].properties[apProperty]}`
				}
				new mapboxgl.Popup()
					.setLngLat(event.features[0].geometry.coordinates)
					.setHTML(school_info)
					.addTo(map);
				let info = document.getElementById('info');
				info.innerHTML = "";
				info.innerHTML = school_info;
			});

			map.on('click', 'KingCounty-layer', (e) => {
				var description = `<strong>Censu Tract:</strong> ${e.features[0].properties.GEO_ID_TRT}<br>`
				description += `<strong>Median Household Income:</strong> ${e.features[0].properties.MHHI1}<br>`


				new mapboxgl.Popup()
					.setLngLat(e.lngLat)
					.setHTML(description)
					.addTo(map);
			});

			let legend_point = document.getElementById('legend-point');
			var labels = ['<strong>Ap Courses</strong>'],
				vbreak;
			vbreak = 'No Data'
			labels.push(
				'<p class="break"><i class="dot" style="background: rgb(0,0,0); width: 6px; height: 6px; "></i> <span class="dot-label" style="top: 3px;">' + vbreak +
				'</span></p>');
			for (var i = 0; i < ap_number.length; i++) {
				vbreak = ' >' + ap_number[i];
				let dot_radii = 2 * radii[i];
				labels.push(
					'<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
					'px; height: ' +
					dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
					'</span></p>');
			}
			legend_point.innerHTML = labels;
			let legend_layer = document.getElementById('legend-layer');
			let title = document.createElement('strong');
			title.textContent = 'Median Household Income(thousand dollars)';

			legend_layer.appendChild(title);
			layers.forEach((layer, i) => {
				const color = colors_layer[i];
				const item = document.createElement('div');
				const key = document.createElement('span');
				key.className = 'legend-key';
				key.style.backgroundColor = color;

				const value = document.createElement('span');
				value.innerHTML = `${layer}`;
				item.appendChild(key);
				item.appendChild(value);
				legend_layer.appendChild(item);
			});

			const source =
				'<p style="text-align: right; font-size:10pt">Source: ' +
				'<a href="https://nces.ed.gov/programs/edge/geographic/schoollocations" target="_blank" styles="position:center">NCES</a></p>';
			legend_point.innerHTML = labels.join('') + source;
			const source_layer =
				'<p style="text-align: right; font-size:10pt">Source: ' +
				'<a href="https://gis-kingcounty.opendata.arcgis.com/datasets/kingcounty::demographic-base-demographic-base-area/about" target="_blank" styles="position:center">Open Data</a></p>';
			legend_layer.innerHTML += source_layer;
		});
	}
})();