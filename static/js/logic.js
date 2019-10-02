// Create first tile layer
var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// var satelitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.satelite",
//     accessToken: API_KEY
// });

var outdoorsemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.outdoors",
    accessToken: API_KEY
});

var baseMaps = {
    Street: streetmap,
    // Satelite: satelitemap,
    Outdoors: outdoorsemap
  };

// Initialize all of the LayerGroups we'll be using
var layers = {
    small: new L.LayerGroup(),
    medium: new L.LayerGroup(),
    large: new L.LayerGroup(),
  };

// Create Map Object
var map = L.map("map", {
    center: [0, 0],
    zoom: 2,
  });

// Add our tilelayers to the map 
streetmap.addTo(map);
// satelitemap.addTo(map);
outdoorsemap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
    "small": layers.small,
    "medium": layers.medium,
    "large": layers.large
}

// Create a control for our layers, add our overlay layers to it
L.control.layers(baseMaps, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
    position: "bottomright"
  });

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
// Add the info legend to the map
info.addTo(map);

// Link for Earthquakes geoJSON
var earthquakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
// var earthquakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"

// Function to create markers from geoJSON to be used with L.geoJSON
function createMarkers(features, latlng) {
    var mag = features.properties.mag;
    if (mag <= 1.0){
        var color = "white"
    } else if (mag <= 2.5){
        var color = "yellow"
    } else {
        var color = "red"
    }
  // Change the values of these options to change the symbol's appearance
  let options = {
    radius: mag,
    color: color,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8,
  }
  console.log("markers done");
  return L.circleMarker(latlng, options);
};

// Grabbing our GeoJSON data..
d3.json(earthquakeJSON, function(json){
    L.geoJson(json, {
        pointToLayer: createMarkers
    }).addTo(map)
});

