var tileLayer1 = L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: 'پدرام ناظری - 09124319683'
});

var tileLayer2 = L.tileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',{
    attribution: ' پدرام ناظری - 09124319683 - pedramnazeri1372@rocketmail.com'
});

var map = L.map('map', {
    center: [32.287, 52.954],
    zoom: 5,
    layers: [tileLayer1]
});

var hotelEditableLayers = new L.FeatureGroup();
map.addLayer(hotelEditableLayers);

var mainLayers = {
    "سرور شماره 1": tileLayer1,
    "سرور شماره 2": tileLayer2
};

var drawingLayers = {
    "هتل ها": hotelEditableLayers
};

L.control.layers(mainLayers,drawingLayers, { position: 'topleft',collapsed: false}).addTo(map);

var drawOptions = {
    position: 'topleft',
    draw:{
        polygon: {
            shapeOptions:{
                color: '#564638'
            }
        },
        polyline: true,
        circle: true,
        marker: true,
        rectangle: true
    },
    edit:{
        featureGroup: hotelEditableLayers
    }
};

var drawControl = new L.Control.Draw(drawOptions);
map.addControl(drawControl);

var hotelIconSetting = L.Icon.extend({
    options:{
        iconSize:[40,40],
        iconAnchor:[20, 35]
    }
});

var restaurantIconSetting = L.Icon.extend({
    options:{
        iconSize:[40,40],
        iconAnchor:[20, 35]
    }
});

var hotelIcon = new hotelIconSetting({iconUrl:'images/1.png'});
var restaurantIcon = new restaurantIconSetting({iconUrl:'images/2.png'});


map.on('draw:created', function(e){
    var layer = e.layer;
    var type = e.layerType;

    if(type === 'marker')
    {
        e.layer.setIcon(hotelIcon);
    }

    hotelEditableLayers.addLayer(layer);
});