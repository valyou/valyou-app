Template.home.rendered = function(){

var map = L.map('map').setView([-26, 130],4);//WA zoom

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

gj01=Meteor.absoluteUrl('/SA2_cutdown_web.json');

// HTTP.get(Meteor.absoluteUrl("/lib/js/SA2_cutdown_web.geojson"), function(err, res){
// 	console.log(err);
// 	console.log(res);
// });
// console.log(gj01);
// console.log(myobject);
console.log(gj01);
$.getJSON(gj01, function(data) {
	console.log(data);
        var places = L.geoJson(data, {
      onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
      }
        });
        map.addLayer(places);
});

}

// counter starts at 0
Session.setDefault("counter", 0);

// slider starts at 20 and 80
Session.setDefault("slider", [20]);

Template.sliders.rendered = function(){
	this.$("#slider").noUiSlider({
		start: Session.get("slider"),
		range: {
			'min': 0,
			'max': 100
		}
	}).on('slide', function (ev, val) {
    // set real values on 'slide' event
    Session.set('slider', val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    Session.set('slider', [Math.round(val[0]), Math.round(val[1])]);
  });

  this.$("#slider2").noUiSlider({
  	start: Session.get("slider"),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    Session.set('slider', val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    Session.set('slider', [Math.round(val[0]), Math.round(val[1])]);
  });

  this.$("#slider3").noUiSlider({
  	start: Session.get("slider"),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    Session.set('slider', val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    Session.set('slider', [Math.round(val[0]), Math.round(val[1])]);
  });

  this.$("#slider4").noUiSlider({
  	start: Session.get("slider"),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    Session.set('slider', val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    Session.set('slider', [Math.round(val[0]), Math.round(val[1])]);
  });

  this.$("#slider5").noUiSlider({
  	start: Session.get("slider"),
  	range: {
  		'min': 0,
  		'max': 100
  	}
  }).on('slide', function (ev, val) {
    // set real values on 'slide' event
    Session.set('slider', val);
  }).on('change', function (ev, val) {
    // round off values on 'change' event
    Session.set('slider', [Math.round(val[0]), Math.round(val[1])]);
  });
}
Template.sliders.helpers({
	counter: function () {
		return Session.get("counter");
	},
	slider: function () {
		return Session.get("slider");
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
}

Template.dropdown.helpers({
	roleProperties : function(){
		return rolePropertiesArray.get();
	}
})

Template.dropdown.events({
  'change select' : function(ev, tmpl){
    // console.log(ev.currentTarget.value);
    _setRolePropertiesHelper(ev.currentTarget.value);
  }
})