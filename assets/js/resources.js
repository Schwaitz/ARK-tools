var components = {
    crystal: {name: 'Crystal', color: 'PaleTurquoise', borderColor: 'black', display: 'true'},

    metal: {name: 'Metal', color: 'silver', borderColor: 'black', display: 'true'},
    richMetal: {name: 'Rich Metal', color: 'GoldenRod', borderColor: 'black', display: 'true'},
    underwaterMetal: {name: 'Underwater Metal', color: 'teal', borderColor: 'black', display: 'false'},

    obsidian: {name: 'Obsidian', color: 'BlueViolet', borderColor: 'white', display: 'false'},

    oil: {name: 'Oil', color: 'black', borderColor: 'black', display: 'false'},
    oilRock: {name: 'Oil Rock', color: '#3B3131', borderColor: 'white', display: 'false'},

    oilVeins: {name: 'Oil Vein', color: '#3B3131', borderColor: 'white', display: 'false'},
    oilVeins2: {name: 'Oil Vein 2', color: '#3B3131', borderColor: 'white', display: 'false'},
    waterVeins: {name: 'Water Vein', color: 'cyan', borderColor: 'white', display: 'false'},

    silica: {name: 'Silica Pearls', color: 'pink', borderColor: 'black', display: 'false'},
    blackPearl: {name: 'Black Pearl', color: 'magenta', borderColor: 'black', display: 'false'},
    salt: {name: 'Raw Salt', color: '#679dae', borderColor: 'black', display: 'false'},
    rockarrot: {name: 'Rockarrot', color: '#3BD319', borderColor: 'black', display: 'false'},
    savoroot: {name: 'Savoroot', color: '2B9111', borderColor: 'black', display: 'false'},
    rareFlower: {name: 'Rare Flower', color: '#ADD8E6', borderColor: 'black', display: 'false'},
    sulfur: {name: 'Sulfur', color: 'Yellow', borderColor: 'black', display: 'false'},
    clay: {name: 'Clay', color: '#FFD800', borderColor: 'black', display: 'false'},
    cactus: {name: 'Cactus', color: 'lightgreen', borderColor: 'green', display: 'false'},

    richDust: {name: 'Rich Dust', color: '#E577DF', borderColor: 'black', display: 'false'},

    riverRock: {name: 'River Rock', color: 'brown', borderColor: 'black', display: 'false'},

    polymer: {name: 'Polymer', color: '#678396', borderColor: 'black', display: 'false'},
    elementOre: {name: 'Element Ore', color: '#E577DF', borderColor: 'black', display: 'false'},
    keratin: {name: 'Keratin', color: '#CBB195', borderColor: 'black', display: 'false'},

    greenGem: {name: 'Green Gem', color: '#60AF33', borderColor: 'black', display: 'false'},
    blueGem: {name: 'Blue Gem', color: '#5091CD', borderColor: 'black', display: 'false'},
    redGem: {name: 'Red Gem', color: '#E26F78', borderColor: 'black', display: 'false'},

    wyvernNests: {name: 'Wyvern Nest', color: '#80456D', borderColor: 'black', display: 'false'},
    iceWyvernNests: {name: 'Ice Wyvern Nest', color: '#4a7880', borderColor: 'black', display: 'false'}
};


var map_resources = {
    "TheIsland": ["crystal", "metal", "richMetal", "obsidian", "silica", "oil", "riverRock"],
    "TheCenter": ["crystal", "metal", "richMetal", "obsidian", "silica", "oil", "riverRock"],
    "ScorchedEarth": ["oilVeins", "oilVeins2", "waterVeins", "wyvernNests", "salt", "sulfur", "crystal", "metal", "richMetal", "obsidian", "silica", "cactus"],
    "Ragnarok": ["oilVeins", "oilVeins2", "waterVeins", "wyvernNests", "iceWyvernNests", "salt", "sulfur", "crystal", "metal", "richMetal", "underwaterMetal", "obsidian", "silica", "oil", "riverRock", "cactus", "blackPearl", "rareFlower", "rockarrot", "savoroot", "clay",],
    "Aberration": ["gasVeins", "drakeNests", "crystal", "metal", "richMetal", "obsidian", "silica", "oil", "riverRock", "blackPearl", "polymer", "elementOre", "keratin", "blueGem", "greenGem", "redGem"],
    "Extinction": ["crystal", "metal", "richMetal", "obsidian", "oil", "riverRock"],
    "Crystal": ["oilVeins", "oilVeins2", "waterVeins", "gasVeins", "drakeNests", "wyvernNests", "salt", "sulfur", "crystal", "metal", "richMetal", "obsidian", "silica", "oil", "riverRock", "cactus", "elementOre", "keratin", "greenGem", "redGem",],
    "Genesis": ["oilVeins", "salt", "sulfur", "crystal", "metal", "richMetal", "obsidian", "oil", "riverRock", "blueGem", "greenGem", "redGem"]
    // "Valguero": [],
};

var currentMap = "Ragnarok";

$(document).ready(function () {

    // $("#current-map").text(currentMap);

    for (var componentName in components) {
        var component = components[componentName];
        var startChecked = component["display"];

        if (startChecked == "true") {
            $("#boxes").append("<input class='form-check-input res-check' type='checkbox' value='' id='" + componentName + "' name='checkbox-stacked' checked><label class='form-check-label res-label' id='" + componentName + "-label' for='" + componentName + "'>" + component["name"] + "</label><br/>")
        } else {
            $("#boxes").append("<input class='form-check-input res-check' type='checkbox' value='' id='" + componentName + "' name='checkbox-stacked'><label class='form-check-label res-label' id='" + componentName + "-label' for='" + componentName + "'>" + component["name"] + "</label><br/>")
        }
    }

    loadMap(currentMap);

    $(":button").click(function () {
        if ($(this).hasClass("map-button")) {

            if ($(this).text().localeCompare(currentMap) !== 0) {
                // $("#current-map").text($(this).text());
                // $("#output").empty();

                loadMap(this.dataset.map);
                currentMap = this.dataset.map

            }
        }
    });

    $('input[name=checkbox-stacked]').change(function () {
        var res_name = $(this).prop("id");

        if ($(this).is(':checked')) {
            components[res_name]["display"] = "true";
            $(".dot-" + res_name).each(function (i, obj) {
                $(this).css("visibility", "visible");
            });
            // loadMap(currentMap);
        } else {
            components[res_name]["display"] = "false";
            $(".dot-" + res_name).each(function (i, obj) {
                $(this).css("visibility", "hidden");
            });
            // loadMap(currentMap);
        }
    });

});


function loadLegend(name) {
    $(".res-check").each(function (i, obj) {
        var res_name = $(this).prop("id");
        if (map_resources[name].includes(res_name)) {
            $(this).show();
            $(this).next().show()
            // $(this).removeClass("visually-hidden");
            // $(this).css("display", "inline");
            // $(this).css("visibility", "visible");
        } else {
            $(this).hide();
            $(this).next().hide()
            // $(this).addClass("visually-hidden");
            // $(this).css("display", "none");
            // $(this).css("visibility", "hidden");
        }
    });

    $(".res-label").each(function (i, obj) {
        var res_name = $(this).prop("id").replace("-label", "");
        if (map_resources[name].includes(res_name)) {
            $(this).show();
            $(this).next().show()
            // $(this).removeClass("visually-hidden");
            // $(this).css("display", "inline");
            // $(this).css("visibility", "visible");
        } else {
            $(this).hide();
            $(this).next().hide()
            // $(this).addClass("visually-hidden");
            // $(this).css("display", "none");
            // $(this).css("visibility", "hidden");
        }
    });
}


function loadMap(name) {
    (function () {
        // $("#output").append("<img height='800' id='mapImage' width='800'>");
        loadLegend(name);
        var map = name;
        fetch('assets/maps/json/' + map + '/map.min.json', {cache: 'reload'}).then(function (response) {
            return response.json();
        }).then(function (data) {
            document.getElementById('mapImage').src = 'assets/maps/imgs/' + map + ".jpg";

            var output = document.getElementById('output');
            while (output.firstChild && output.firstChild.nodeName === 'DIV') {
                output.removeChild(output.firstChild);
            }

            for (var componentName in components) {
                var component = components[componentName];
                if (data[componentName]) {
                    for (var node of data[componentName]) {
                        var latShift = parseFloat(data["latShift"]);
                        var longShift = parseFloat(data["longShift"]);
                        var latScale = parseInt(data["latScale"]);
                        var longScale = parseInt(data["longScale"]);

                        var lat = node.lat;
                        var lon = node.long;
                        // var mapsize = 800;
                        var mapsize = 800;
                        var ms = 7;
                        var mt = 'lat ' + lat + ', lon ' + lon;
                        var borderCoords = {t: 0.0, r: 100.0, b: 100.0, l: 0.0};
                        // var borderCoords = {t: 0.0, r: 100.0, b: 100.0, l: 0.0};

                        var div = document.createElement('div');
                        div.className = "res-dot dot-" + componentName;
                        if (component["display"] === "true") {
                            div.style.visibility = "visible";
                        } else {
                            div.style.visibility = "hidden";
                        }
                        div.style.position = 'absolute';
                        div.style.lineHeight = 0;
                        div.style.left = 100 * ((lon - borderCoords.l) / (borderCoords.r - borderCoords.l) - ms / (2 * mapsize)) + '%';
                        div.style.top = 100 * ((lat - borderCoords.t) / (borderCoords.b - borderCoords.t) - ms / (2 * mapsize)) + '%';
                        div.style.padding = 0;
                        div.style.width = ms + 'px';
                        div.style.height = ms + 'px';
                        div.style.borderRadius = '50%';
                        div.style.backgroundColor = component.color;
                        div.style.border = '1px solid ' + component.borderColor;
                        div.title = mt;

                        output.insertBefore(div, output.firstChild);
                    }
                }
            }
        });
    })();
}
