var component_templates = {
    crystal: {name: 'Crystal', color: 'PaleTurquoise'},
    metal: {name: 'Metal', color: 'grey'},
    richMetal: {name: 'Rich Metal', color: 'GoldenRod'},
    obsidian: {name: 'Obsidian', color: 'BlueViolet'},
    oil: {name: 'Oil', color: 'black'},
    silica: {name: 'Silica Pearls', color: 'white'},
	riverRock: {name: 'River Rock', color: 'Bisque'},
	salt: {name: 'Salt', color: 'AliceBlue'},
	sulfur: {name: 'Sulfur', color: 'Yellow'},
	cactus: {name: 'Cactus', color: 'OliveDrab'}

}


var components = {};


var currentMap = "TheIsland";


$(document).ready(function() {


    loadMap("TheCenter");
	$("#current-map").text("The Center");

    for (var componentName in component_templates) {
        var component = component_templates[componentName];
        $("#checkboxes").append("<label class='custom-control custom-checkbox'>" +
            "<input id='" + componentName + "' name='checkbox-stacked' type='checkbox' class='custom-control-input'>" +
            "<span class='custom-control-indicator'></span>" +
            "<span class='custom-control-description'>" + component["name"] + "</span>" +
            "</label>");
    }


    $(":button").click(function () {

        if ($(this).hasClass("map-button")) {
            $("#current-map").text($(this).text());
            loadMap(this.dataset.map);
        }
    });


    $(":checkbox").click(function () {
        var res_name = $(this).prop("id");

        // False to True
        if ($(this).prop("checked") === true) {

            components[res_name] = component_templates[res_name];
            loadMap(currentMap);
        }

        // True to False
        else {
            delete components[res_name];
            loadMap(currentMap);
        }
    });


});


function loadMap(name) {


    var map = name;
    currentMap = name;
    fetch('./assets/maps/' + map + '/map.json', {cache: 'reload'}).then(function (response) {
        return response.json();
    }).then(function (data) {
        document.getElementById('mapImage').src = './assets/maps/' + map + '/' + data.heldMap;

        var output = document.getElementById('output');
        while (output.firstChild && output.firstChild.nodeName === 'DIV') {
            output.removeChild(output.firstChild);
        }

        for (var componentName in components) {
            var component = components[componentName];
            if (data[componentName]) {
                for (var node of data[componentName]) {
                    var lat = node.lat;
                    var lon = node.long;
                    var mapsize = 800;
                    var ms = 9;
                    var mt = 'lat ' + lat + ', lon ' + lon;
                    var borderCoords = {t: 0.0, r: 100.0, b: 100.0, l: 0.0};

                    var div = document.createElement('div');
                    div.style.position = 'absolute';
                    div.style.lineHeight = 0;
                    div.style.left = 100 * ((lon - borderCoords.l) / (borderCoords.r - borderCoords.l) - ms / (2 * mapsize)) + '%';
                    div.style.top = 100 * ((lat - borderCoords.t) / (borderCoords.b - borderCoords.t) - ms / (2 * mapsize)) + '%';
                    div.style.padding = 0;
                    div.style.width = ms + 'px';
                    div.style.height = ms + 'px';
                    div.style.borderRadius = '50%';
                    div.style.backgroundColor = component.color;
                    div.style.border = '1px solid black';
                    div.title = mt;
                    div.className = "dot";

                    output.insertBefore(div, output.firstChild);
                }
            }
        }
    });
}

