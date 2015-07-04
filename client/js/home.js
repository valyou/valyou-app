Template.home.rendered = function(){
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
  
  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([-26, 130],4);

  // L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
		maxZoom: 19,
		id: 'examples.map-i875mjb7'
	}).addTo(map);//free MapBox basemap

	gj01='gj_test.geojson';

	$.getJSON(gj01, function(data) {
		var places = L.geoJson(data, {
			pointToLayer: function (feature, latlng) {return L.marker(latlng, {icon: icon_azure, title: feature.properties.name});},
			onEachFeature: onEachPoint
		});
		var markers = L.markerClusterGroup({
				showCoverageOnHover: false	,
				maxClusterRadius: 30
		});
		markers.addLayer(places);
		map.addLayer(markers);
	});

	function onEachPoint(feature, layer) {
		layer.on('click',function(){
			infoDiv=feature.properties.name+'</br>';
			infoDiv+=feature.properties.address+'</br>';
			infoDiv+='<a target="_blank" href="'+feature.properties.website+'"/>'+feature.properties.website+'</a></br>';
			document.getElementById("info").innerHTML=infoDiv;
		});
		var popup = "";
		popup += '<div class="beer_popup">';
		popup += feature.properties.name+'</br>';
		popup += '<a target="_blank" href="'+feature.properties.website+'"/>WEBSITE</a></br>';
		popup += '</div>';
		layer.bindPopup(popup);
	};
}