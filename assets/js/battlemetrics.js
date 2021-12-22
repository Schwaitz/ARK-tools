var servers = {
    TheIsland: {
        name: "The Island",
        code: 'lthay',
        src: 'https://cdn.battlemetrics.com/b/standardVertical/13104434.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300'
    },
    Ragnarok: {
        name: "Ragnarok",
        code: 'jnyqh',
        src: 'https://cdn.battlemetrics.com/b/standardVertical/13104450.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300'
    },
    Aberration: {
        name: "Aberration",
        code: 'https://cdn.battlemetrics.com/b/standardVertical/13104437.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300',
        src: 'jfeet'
    },
    Extinction: {
        name: "Extinction",
        code: 'islnj',
        src: 'https://cdn.battlemetrics.com/b/standardVertical/13104436.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300'
    },
    Genesis1: {
        name: "Genesis1",
        code: 'hpvsp',
        src: 'https://cdn.battlemetrics.com/b/standardVertical/13104433.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300'
    },
    Genesis2: {
        name: "Genesis2",
        code: 'qmslm',
        src: 'https://cdn.battlemetrics.com/b/standardVertical/13104435.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300'
    },
    LostIsland: {
        name: "LostIsland",
        code: 'aubuv',
        src: 'https://cdn.battlemetrics.com/b/standardVertical/13625752.png?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3ART&chartColor=%23FF0700&showPlayers=1&maxPlayersHeight=300'
    },
    // CrystalIsles: {
    //     name: "Crystal Isles",
    //     code: '',
    //     src: ''
    // },
    // ScorchedEarth: {
    //     name: "Scorched Earth",
    //     code: '',
    //     src: ''
    // },
    // TheCenter: {
    //     name: "The Center",
    //     code: '',
    //     src: ''
    // },


};

var serverIds = {
    "TheIsland": "13104434",
    "Ragnarok": "13104450",
    "Aberration": "13104437",
    "Extinction": "13104436",
    "Genesis1": "13104433",
    "Genesis2": "13104435",
    "LostIsland": "13625752",
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

}


function handleBMLoading(code, src) {
    if (bm_loaded == true) {
        $("#bm-space").empty();
    } else {
        bm_loaded = true;
    }
    $("#bm-space").append("<iframe scrolling=\"no\" frameborder=0 name='" + code + "' src='" + src + "' style='border:0;height:100%'></iframe>");
}


function apiGETPlayers(serverName) {

    $.ajax({
        url: "https://api.battlemetrics.com/servers/" + serverIds[serverName] + "?include=player",
        type: 'GET',
        dataType: 'json',
        success: function (obj) {

            // var player_count = parseInt(obj["data"]["attributes"]["players"]);
            // var map = obj["data"]["attributes"]["details"]["map"];

            var players = [];

            for (var i = 0; i < obj["included"].length; i++) {
                if (obj["included"][i]["type"] === "player") {
                    players.push(obj["included"][i]["attributes"]["name"])
                }
            }

            console.log("-----Online Players-----");
            for (var i = 0; i < players.length; i++) {
                console.log(players[i]);
            }
            console.log("----------------------");

            console.log(obj)

            console.log("\n");

        },
        error: function () {
            console.log('Failed to fetch players from API');
        },
        beforeSend: setHeader
    });

    function setHeader(xhr) {
        // xhr.setRequestHeader('Authorization', 'Bearer Token goes here, not putting it in plain text lmao');
    }

}











