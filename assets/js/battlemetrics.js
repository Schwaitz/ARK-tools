var servers = {
    Ragnarok: {name: 'Ragnarok', code: 'hgnom', src: 'https://cdn.battlemetrics.com/b/standardVertical/6654616.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    Extinction: {name: 'Extinction', code: 'rwocd',  src: 'https://cdn.battlemetrics.com/b/standardVertical/6654623.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    TheIsland: {name: 'TheIsland', code: 'gjhhq',  src: 'https://cdn.battlemetrics.com/b/standardVertical/6654622.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    Genesis: {name: 'Genesis', code: 'gircb',  src: 'https://cdn.battlemetrics.com/b/standardVertical/6654620.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    Aberration: {name: 'Aberration', code: 'rzdmv',  src: 'https://cdn.battlemetrics.com/b/standardVertical/6654620.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    CrystalIsles: {name: 'Crystal Isles', code: 'irttx',  src: 'https://cdn.battlemetrics.com/b/standardVertical/7274534.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    ScorchedEarth: {name: 'Scorched Earth', code: 'otaip',  src: 'https://cdn.battlemetrics.com/b/standardVertical/6654613.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    TheCenter: {name: 'The Center', code: 'hqsja',  src: 'https://cdn.battlemetrics.com/b/standardVertical/6654615.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},
    Valguero: {name: 'Valguero', code: 'dmmpe',  src: 'https://cdn.battlemetrics.com/b/standardVertical/6654614.html?foreground=%23EEEEEE&linkColor=%231185ec&lines=%23333333&background=%23222222&chart=players%3A24H&chartColor=%23FF0700&maxPlayersHeight=300'},

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



function handleBMLoading(code, src) {
    if (bm_loaded == true) {
        $("#bm-space").empty();
    } else {
        bm_loaded = true;
    }
    $("#bm-space").append("<iframe frameborder=0 name='" + code + "' src='" + src + "' style='border:0'></iframe>");
}