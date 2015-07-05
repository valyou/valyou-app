var type1Slider = new ReactiveVar(0);
var type2Slider = new ReactiveVar(0);
var type3Slider = new ReactiveVar(0);
var type4Slider = new ReactiveVar(0);
var type5Slider = new ReactiveVar(0);

Template.home.rendered = function(){
  // ------------------------------------------------------------
  // Constants
  // ------------------------------------------------------------
  // Default view
  var AUS_LAT = -24.8;
  var AUS_LNG = 123.2;
  var ZOOM_LVL = 5;
  
  // GeoJSON source URL path
  var GEOJSON_URL = '/SA2_cutdown_web.json';

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
  // $('#map').css({ width: CONT_X, height: CONT_Y });
  var map = L.map('map').addLayer(tiles).setView([AUS_LAT, AUS_LNG], ZOOM_LVL);
  
  var i = 30;
  var icon_azure = L.icon({
    iconUrl: 'img/icon_azure.png',
    iconSize: [i, i],
    iconAnchor: [i/2, i],
    popupAnchor: [0, -i]
  });

  // L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   id: 'examples.map-i875mjb7'
  // }).addTo(map);//free MapBox basemap

  gj01=Meteor.absoluteUrl(GEOJSON_URL);
  
  $.getJSON(gj01, function(data) {
    var places = L.geoJson(data, { style: style }, { onEachFeature: onEachFeature });
    map.addLayer(places);
  });
  
  // Apply a function on each map layer feature
  function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.SA2_NAME11);
  }
  
  function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'green',
        dashArray: '3',
        fillOpacity: getRandomInt(1, 10) / 10
    };
  }
 
  // Convenience function: Get random integer within a range
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

Template.sliders.rendered = function(){
	this.$("#slider1").noUiSlider({
		start: type1Slider.get(),
		range: {
			'min': 0,
			'max': 100
		}
	}).on('slide', function (ev, val) {
    // set real values on 'slide' event
    type1Slider.set(val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    type1Slider.set(val);
  });

  this.$("#slider2").noUiSlider({
  	start: type2Slider.get(),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    type2Slider.set(val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    type2Slider.set(val);
  });

  this.$("#slider3").noUiSlider({
  	start: type3Slider.get(),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    type3Slider.set(val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    type3Slider.set(val);
  });

  this.$("#slider4").noUiSlider({
  	start: type4Slider.get(),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    type4Slider.set(val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    type4Slider.set(val);
  });

  this.$("#slider5").noUiSlider({
  	start: type5Slider.get(),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    type5Slider.set(val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    type5Slider.set(val);
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
  _rolePropertiesHelper(val);
};

Template.dropdown.helpers({
	roleProperties : function(){
		return rolePropertiesArray.get();
	}
});

var _setSliderPropertiesHelper = function(val){
  switch(val) {
    case "property 1.1":
      console.log("case: property1.1 ");
      adjustSliders([11,22,33,44,55]);
    break;
    case "property 1.2":
      console.log("case: property1.2");
      adjustSliders([22,33,44,55,66]);
    break;
    default:
    break;
  }
};

var adjustSliders = function(val) {
  type1Slider.set(val[0]);
  type2Slider.set(val[1]);
  type3Slider.set(val[2]);
  type4Slider.set(val[3]);
  type5Slider.set(val[4]);
  var firstStyle = "left:" + type1Slider.get() +"%";
  $("#slider1").children().children().attr("style", firstStyle);

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