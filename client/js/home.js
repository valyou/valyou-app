var type1Slider = new ReactiveVar(0);
var type2Slider = new ReactiveVar(0);
var type3Slider = new ReactiveVar(0);
var type4Slider = new ReactiveVar(0);
var type5Slider = new ReactiveVar(0);

var mapJson;
var map;

var loadLayerMap = function(jsonFile){
  $.getJSON(jsonFile, function(data) {
    
    mapJson = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      }
    });
    
    map.addLayer(mapJson);

    console.log(mapJson);
    console.log("map", map);
  });
};

var drawMap = function(value){
  if (map.hasLayer() && mapJson){
    map.removeLayer(mapJson);
  }
  console.log(mapJson);
  map.addLayer(mapJson);
}

Template.home.rendered = function(){

  // instantiate map variable
  map = L.map('map').setView([-26, 130],4);//WA zoom

  var i = 30;
  var icon_azure = L.icon({
    iconUrl: 'img/icon_azure.png',
    iconSize: [i, i],
    iconAnchor: [i/2, i],
    popupAnchor: [0, -i]
  });

  L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    maxZoom: 19,
    id: 'examples.map-i875mjb7'
  }).addTo(map);//free MapBox basemap

  gj01 = Meteor.absoluteUrl('/SA2_cutdown_web.json');

  loadLayerMap(gj01); // instantiate mapJson here also
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
    drawMap()
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

var redraw = function(changeVal){

}

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
      adjustSliders([0,0,0,0,0]);
    break;
  }
};

var adjustSliders = function(val) {
  type1Slider.set(val[0]);
  type2Slider.set(val[1]);
  type3Slider.set(val[2]);
  type4Slider.set(val[3]);
  type5Slider.set(val[4]);

  var stringConcat = function(number){
    return "left:" + number + "%";
  }

  // var firstStyle = "left:" + type1Slider.get() +"%";
  $("#slider1").children().children().attr("style", stringConcat(type1Slider.get()));
  $("#slider2").children().children().attr("style", stringConcat(type2Slider.get()));
  $("#slider3").children().children().attr("style", stringConcat(type3Slider.get()));
  $("#slider4").children().children().attr("style", stringConcat(type4Slider.get()));
  $("#slider5").children().children().attr("style", stringConcat(type5Slider.get()));

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