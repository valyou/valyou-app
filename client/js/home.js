var type1Slider = new ReactiveVar(0);
var type2Slider = new ReactiveVar(0);
var type3Slider = new ReactiveVar(0);
var type4Slider = new ReactiveVar(0);
var type5Slider = new ReactiveVar(0);
var type6Slider = new ReactiveVar(0);

// Global GeoJSON and Map reference
var mapJson;
var map;
var sidebar;

// Load / initialise layer map
var loadLayerMap = function(jsonFile) {
  $.getJSON(jsonFile, function(data) {
    mapJson = L.geoJson(data, { 
        style: style, 
        onEachFeature: onEachFeature
      });
    
    drawMap("anything");

  });
};

// Draw / toggle map layer
var drawMap = function(value) {
  if (map.hasLayer() && mapJson) {
    map.removeLayer(mapJson);
  }
  
  map.addLayer(mapJson);
}

// Redraw map layer
var redrawMap = function() {
  mapJson.eachLayer(function (layer) {
    layer.setStyle({ fillOpacity: getWeighted(layer.feature) });
  });
}
  
// Apply a function on each map layer feature
function onEachFeature(feature, layer) {
  var opening = '<div class="checkpoint"><h2>';
  var ending = '</div>';
  var h2title = '<h2>'+feature.properties.SA2_NAME11+'</h2>';
  var h3title = '<h3>'+feature.properties.SA3_NAME11+'</h3>';

  var openingParagraph = '<p>';
  var closingParagraph = '</p>';

  var aboriginal = 'Aboriginal = ' + Math.floor(feature.properties.category_totals_aboriginal_value);
  var protectedAreas = 'Protected Areas = ' + Math.floor(feature.properties.category_totals_conservation_value);
  var ecologyDiversity = 'Ecology Diversity = ' + Math.floor(feature.properties.category_totals_ecology_value);
  var population = 'Population = ' + Math.floor(feature.properties.category_totals_economy_value);
  var energyExtraction = 'Energy Extraction = ' + Math.floor(feature.properties.category_totals_energy_value);
  var mining = 'Mining = ' + Math.floor(feature.properties.category_totals_mine_value);
  var breakline = '<br>';
  var content = opening + h2title + h3title + openingParagraph;
  content += aboriginal + breakline;
  content += ecologyDiversity + breakline;
  content += energyExtraction + breakline;
  content += mining + breakline;
  content += population + breakline;
  content += protectedAreas + breakline;
  content += closingParagraph + ending;
  layer.bindPopup(content);
}

// Apply a styling on each map layer feature
function style(feature) {
  return {
    weight: 2,
    opacity: 1,
    color: 'green',
    dashArray: '3',
    fillOpacity: getWeighted(feature)
  };
}

// Convenience function: Get random integer within a range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Get weighted value
function getWeighted(feature) {
  var props = feature.properties;
  var aboriginal_value = props.category_totals_aboriginal_value * type1Slider.get() / 15;
  var conservation_value = props.category_totals_conservation_value * type2Slider.get() / 100;
  var ecology_value = props.category_totals_ecology_value * type3Slider.get() / 100;
  var economy_value = props.category_totals_economy_value * type4Slider.get() / 100;
  var energy_value = props.category_totals_energy_value * type5Slider.get() / 175;  
  var mine_value = props.category_totals_mine_value * type6Slider.get() / 200;
  return ((aboriginal_value + conservation_value + ecology_value + economy_value + energy_value + mine_value) / 6 * 0.9);
}

Template.home.rendered = function(){
  // ------------------------------------------------------------
  // Constants
  // ------------------------------------------------------------
  // Default view
  var AUS_LAT = -24.8;
  var AUS_LNG = 118.2;
  var ZOOM_LVL = 5;
  
  // Preset locations
  var LOC_PERTH = new L.LatLng(-32, 115.825);
  var LOC_WA = new L.LatLng(AUS_LAT, AUS_LNG);
  
  // GeoJSON source URL path
  var GEOJSON_URL = 'SA2_cutdown_web.geojson';

  // Use jQuery to set container to 100% width and height
  var CONT_X = $(window).width();
  var CONT_Y = $(window).height();
  
  
  
  // ------------------------------------------------------------
  // Leaflet + MapBox + SideBar
  // ------------------------------------------------------------
  var tiles =
      L.tileLayer(
          'http://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png',
          {
              id: 'examples.map-i875mjb7',
              attribution: '2015 &copy; ValYou',
              maxZoom: 18
          });
          
  // Set map's viewport to full width and height before initialisation
  $('#map').css({ width: CONT_X, height: CONT_Y });
  map = L.map('map').addLayer(tiles).setView(LOC_WA, 5);
  sidebar = L.control.sidebar('sidebar').addTo(map);

  var i = 30;
  var icon_azure = L.icon({
    iconUrl: 'img/icon_azure.png',
    iconSize: [i, i],
    iconAnchor: [i/2, i],
    popupAnchor: [0, -i]
  });

  // Load GeoJSON after everything is initialised,
  // and load / draw the layer map
  gj01 = Meteor.absoluteUrl(GEOJSON_URL);
  loadLayerMap(gj01);
  
  this.$('#wa-btn').click(function() {
    map.setView([AUS_LAT, AUS_LNG], ZOOM_LVL, { animation: true });
  });
  
  this.$('#perth-btn').click(function() {
    map.setView(LOC_PERTH, 10, { animation: true });
  });
}

Template.sliders.rendered = function(){
	this.$("#slider1").noUiSlider({
		start: type1Slider.get(),
    step: 1,
		range: {
			'min': 0,
			'max': 10
		}
	}).on('slide change', function (ev, val) {
    type1Slider.set(val);
    redrawMap();
  });

  this.$("#slider2").noUiSlider({
  	start: type2Slider.get(),
    step: 1,
		range: {
			'min': 0,
			'max': 10
		}
  }).on('slide change', function (ev, val) {
    type2Slider.set(val);
    redrawMap();
  });

  this.$("#slider3").noUiSlider({
  	start: type3Slider.get(),
    step: 1,
		range: {
			'min': 0,
			'max': 10
		}
  }).on('slide change', function (ev, val) {
    type3Slider.set(val);
    redrawMap();
  });

  this.$("#slider4").noUiSlider({
  	start: type4Slider.get(),
    step: 1,
		range: {
			'min': 0,
			'max': 10
		}
  }).on('slide change', function (ev, val) {
    type4Slider.set(val);
    redrawMap();
  });

  this.$("#slider5").noUiSlider({
  	start: type5Slider.get(),
    step: 1,
		range: {
			'min': 0,
			'max': 10
		}
  }).on('slide change', function (ev, val) {
    type5Slider.set(val);
    redrawMap();
  });

  this.$("#slider6").noUiSlider({
  	start: type6Slider.get(),
    step: 1,
		range: {
			'min': 0,
			'max': 10
		}
  }).on('slide change', function (ev, val) {
    type6Slider.set(val);
    redrawMap();
  });
}

Template.sliders.helpers({
	slider1: function () {
		return type1Slider.get();
	},
  slider2: function () {
    return type2Slider.get();
  },
  slider3: function () {
    return type3Slider.get();
  },
  slider4: function () {
    return type4Slider.get();
  },
  slider5: function () {
    return type5Slider.get();
  }, 
  slider6: function () {
    return type6Slider.get();
  }
});

Template.sliders.events({
	'click button': function () {
    // increment the counter when button is clicked
    Session.set("counter", Session.get("counter") + 1);
  }
});

var dropdownReactive = new ReactiveVar("select a role");

var rolePropertiesArray = new ReactiveVar(["select"])

var _rolePropertiesHelper = function(selectedRole){
  switch(selectedRole){
    case "1":
    var properties = [
    "select",
    "property 1.1",
    "property 1.2",
    "property 1.3",
    "property 1.4",
    "property 1.5"
    ]
    rolePropertiesArray.set(properties);
    break;
    case "2":
    var properties = [
    "select",
    "property 2.1",
    "property 2.2",
    "property 2.3",
    "property 2.4",
    "property 2.5"
    ]
    rolePropertiesArray.set(properties);
    break;
    case "3":
    var properties = [
    "select",
    "property 3.1",
    "property 3.2",
    "property 3.3",
    "property 3.4",
    "property 3.5"
    ]
    rolePropertiesArray.set(properties);
    break;
    case "4":
    var properties = [
    "select",
    "property 4.1",
    "property 4.2",
    "property 4.3",
    "property 4.4",
    "property 4.5"
    ]
    rolePropertiesArray.set(properties);
    break;
    case "5":
    var properties = [
    "select",
    "property 5.1",
    "property 5.2",
    "property 5.3",
    "property 5.4",
    "property 5.5"
    ]
    rolePropertiesArray.set(properties);
    break;
    default:
    break;
  }
}

var _setRolePropertiesHelper = function(val){
  switch(val) {
    case "Investment Opportunities":
      adjustSliders([5,1,1,7,8,8,7]);
      break;
      
    case "Environmental Awareness":
      adjustSliders([7,10,10,4,1,1]);
      break;
      
    case "Cultural Significance":
      adjustSliders([10,8,10,5,3,3]);
      break;
      
    default:
      adjustSliders([0,0,0,0,0,0]);
      break;
  }

};

Template.dropdown.helpers({
	roleProperties : function(){
		return rolePropertiesArray.get();
	}
});

var adjustSliders = function(val) {
  console.log("adjustSliders()", val);
  type1Slider.set(val[0]);
  type2Slider.set(val[1]);
  type3Slider.set(val[2]);
  type4Slider.set(val[3]);
  type5Slider.set(val[4]);
  type6Slider.set(val[5]);

  var stringConcat = function(number){
    return "left:" + number * 10 + "%";
  }

  // var firstStyle = "left:" + type1Slider.get() +"%";
  $("#slider1").children().children().attr("style", stringConcat(type1Slider.get()));
  $("#slider2").children().children().attr("style", stringConcat(type2Slider.get()));
  $("#slider3").children().children().attr("style", stringConcat(type3Slider.get()));
  $("#slider4").children().children().attr("style", stringConcat(type4Slider.get()));
  $("#slider5").children().children().attr("style", stringConcat(type5Slider.get()));
  $("#slider6").children().children().attr("style", stringConcat(type6Slider.get()));
}

Template.dropdown.events({
  'change .roles' : function(ev, tmpl){
    // console.log(ev.currentTarget.value);
    _setRolePropertiesHelper(ev.currentTarget.value);
  },
  'change .properties' : function(ev, tmpl) {
    _setSliderPropertiesHelper(ev.currentTarget.value);
  }
});