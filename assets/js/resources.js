var components = {
    metal: {name: 'Metal', color: 'grey', display: 'true'},
    richMetal: {name: 'Rich Metal', color: 'GoldenRod', display: 'true'},
    crystal: {name: 'Crystal', color: 'PaleTurquoise', display: 'true'},
    obsidian: {name: 'Obsidian', color: 'BlueViolet', display: 'false'},
    oil: {name: 'Oil', color: 'black', display: 'false'},
    silica: {name: 'Silica Pearls', color: 'white', display: 'false'},
    // riverRock: {name: 'River Rock', color: 'Bisque', display: 'true'},
    salt: {name: 'Salt', color: 'AliceBlue', display: 'false'},
    sulfur: {name: 'Sulfur', color: 'Yellow', display: 'false'},
    // cactus: {name: 'Cactus', color: 'OliveDrab', display: 'true'}
};

var currentMap = "Ragnarok";


$(document).ready(function () {


    // $("#current-map").text(currentMap);
    loadMap(currentMap, components);

    for (var componentName in components) {
        var component = components[componentName];
        var startChecked = component["display"];

        if (startChecked == "true") {
            $("#boxes").append("<input class='form-check-input res-check' type='checkbox' value='' id='" + componentName + "' name='checkbox-stacked' checked><label class='form-check-label res-label' for='" + componentName + "'>" + component["name"] + "</label><br/>")
        } else {
            $("#boxes").append("<input class='form-check-input res-check' type='checkbox' value='' id='" + componentName + "' name='checkbox-stacked'><label class='form-check-label res-label' for='" + componentName + "'>" + component["name"] + "</label><br/>")
        }

    }


    $(":button").click(function () {
        if ($(this).hasClass("map-button")) {

            if ($(this).text().localeCompare(currentMap) !== 0) {
                // $("#current-map").text($(this).text());
                loadMap(this.dataset.map, components);
                currentMap = this.dataset.map

            }
        }
    });


    $('input[name=checkbox-stacked]').change(function () {
        var res_name = $(this).prop("id");

        if ($(this).is(':checked')) {
            components[res_name]["display"] = "true";
            loadMap(currentMap, components);
        } else {
            components[res_name]["display"] = "false";
            loadMap(currentMap, components);
        }
    });

});


function loadMap(name, components) {
    (function () {
        var map = name;
        fetch('assets/maps/json/' + map + '/map.json', {cache: 'reload'}).then(function (response) {
            return response.json();
        }).then(function (data) {
            document.getElementById('mapImage').src = 'assets/maps/imgs/' + map + ".jpg";

            var output = document.getElementById('output');
            while (output.firstChild && output.firstChild.nodeName === 'DIV') {
                output.removeChild(output.firstChild);
            }

            for (var componentName in components) {
                var component = components[componentName];
                if (component["display"] === "true") {
                    if (data[componentName]) {
                        for (var node of data[componentName]) {
                            var lat = node.lat;
                            var lon = node.long;
                            var mapsize = 800;
                            var ms = 7;
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

                            output.insertBefore(div, output.firstChild);
                        }
                    }
                }
            }
        });
    })();
}
