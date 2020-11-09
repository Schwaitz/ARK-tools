var servers = {
    Ragnarok: {
        name: "Ragnarok",
        code: "ynsmd",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/6654616.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    Extinction: {
        name: "Extinction",
        code: "amisf",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/6654623.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    TheIsland: {
        name: "The Island",
        code: "nxogt",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/6654622.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    Genesis: {
        name: "Genesis",
        code: "upywn",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/6654621.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    Aberration: {
        name: "Aberration",
        code: "prkox",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/8813445.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    CrystalIsles: {
        name: "Crystal Isles",
        code: "tdrbm",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/7274534.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    ScorchedEarth: {
        name: "Scorched Earth",
        code: "zxyxi",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/6654613.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    TheCenter: {
        name: "The Center",
        code: "ciijn",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/6654615.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },
    Valguero: {
        name: "Valguero",
        code: "jesdc",
        src: 'https://cdn.battlemetrics.com/b/standardVertical/6654614.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight='
    },

};

var serverIds = {
    "Ragnarok": "6654616",
    "The Center": "6654615",
    "Valguero": "6654614",
    "Crystal Isles": "7274534",
    "Genesis": "6654621",
    "The Island": "6654622",
    "Extinction": "6654623",
    "Scorched Earth": "6654613",
    "Aberration": "8813445",
};


bm_loaded = false;

$(document).ready(function () {


    for (var serverName in servers) {
        var server = servers[serverName];
        $("#bm-button-group").append("<button type='button' class='btn btn-primary bm-button' id='" + serverName + "' type='button'>" + server["name"] + "</button><br/>");
        // console.log(server["src"])
    }

    // for (var key in servers) {
    //     var id_name = "load-" + key + "-button";
    //
    // }


    $(":button").click(function () {
        if ($(this).hasClass("bm-button")) {
            var serverName = $(this).prop("id");
            handleMapChange(serverName);
            handleBMLoading(servers[serverName]["code"], servers[serverName]["src"]);
        }

    });

    window.addEventListener('message', function (e) {
        if (e.data.uid && e.data.type === 'sizeUpdate') {
            var i = document.querySelector('iframe[name="' + e.data.uid + '"]');
            i.style.width = e.data.payload.width;
            i.style.height = e.data.payload.height;
        }
    });

});


function handleMapChange(serverName) {
    var serverID = serverIds[serverName];
    $("#selected-map").text(serverName);

    // $.getJSON("https://api.battlemetrics.com/servers/" + serverID + "?include=player", function (obj) {
    //     // var player_count = parseInt(obj["data"]["attributes"]["players"]);
    //     // var map = obj["data"]["attributes"]["details"]["map"];
    //
    //     $("#selected-map").text(serverName);
    //
    //     $("#player-list-header").text("Player List");
    //     $("#player-list-ul").innerHTML = "";
    //
    //     var players = [];
    //
    //     for (var i = 0; i < obj["included"].length; i++) {
    //         if (obj["included"][i]["type"] === "player") {
    //             players.push(obj["included"][i]["attributes"]["name"])
    //         }
    //     }
    //
    //     for (var i = 0; i < players.length; i++) {
    //         $("#player-list-ul").append("<li id='player-list-" + players[i] + "'>" + players[i] + "</li>");
    //     }
    //
    //     console.log(obj)
    // });
}


function handleBMLoading(code, src) {
    if (bm_loaded == true) {
        $("#bm-space").empty();
    } else {
        bm_loaded = true;
    }
    $("#bm-space").append("<iframe frameborder=0 name='" + code + "' src='" + src + "' style='border:0'></iframe>");
}