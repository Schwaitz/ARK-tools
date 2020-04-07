var debug = false;

var WX = 0;
var WY = 0;


$(document).ready(function () {


    var links = {
        "Google": "http://google.com",
        "Dododex": "http://dododex.com",
        "ARK Wiki": "http://ark.gamepedia.com",
        "ARK Wiki: Kibble": "http://ark.gamepedia.com/Kibble",
        "ARK Wiki: Center Resource Map": "http://ark.gamepedia.com/Resource_Map_(The_Center)",
        "ARK Wiki: Center Spawn Map": "https://ark.gamepedia.com/Spawn_Map_(The_Center)",
        "Breeding Calculator": "http://ark.crumplecorn.com/breeding/"
    };

    // $("#current").on("input", function () {
    //     $("#current-num").text($(this).val());
    //
    //     let num = ($("#total").val() - $(this).val()) / 40;
    //     $("#narc").text("Narcotics Needed: " + num);
    // });
    //
    //
    // $("#total").change(function () {
    //     $("#current").attr("max", $(this).val());
    //     $("#total_num").text($(this).val());
    // });


    $("#hatch-time").change(function () {
        for (var i = 1; i < 5; i++) {

            var new_time = $(this).val();


            var num = i * 8;

            for (var j = 0; j < 5; j++) {
                if (parseInt(new_time.substr(0, 2)) + num > 23) {
                    num = num - 12;
                }
            }

            var h = parseInt(new_time.substr(0, 2)) + num;

            if (h >= 12) {
                h = h - 12;
            }
            if (h === 0) {
                h = 12;
            }


            var imprint_string = h + ":" + new_time.substr(3, new_time.length);

            $("#imprint-" + i).text(imprint_string)

        }


    });


    $("#debug").click(function () {
        if (debug ? debug = false : debug = true) {
            $("div[class^='row'], div[class*=' row']").css("border", "1px solid rgba(255, 181, 134, 0.50)");
            $("div[class^='col'], div[class*=' col']").css("border", "1px solid rgba(143, 196, 255, 0.50)");
        }
        else {
            $("div[class^='row'], div[class*=' row']").css("border", "");
            $("div[class^='col'], div[class*=' col']").css("border", "");
        }
    });


    for (var key in links) {
        $("#tab-links").append("<a href=\"" + links[key] + "\" class=\"list-group-item\">" + key + "</a>")
        $("#dropdown-links").append("<a class=\"dropdown-item\" href=\"" + links[key] + "\">" + key + "</a>");
    }


    var today = new Date();
    var today_string = today.getHours() + ":" + today.getMinutes();

    if (today.getMinutes().toString().length === 1) {
        today_string = today_string.substr(0, today_string.length - 1) + "0" + today_string[today_string.length - 1];
    }

    $("#hatch-time").attr("value", today_string);


    for (var i = 1; i < 5; i++) {
        // imprint_date.setTime(today.getDate());

        var num = i * 8;

        for (var j = 0; j < 5; j++) {
            if (today.getHours() + num > 23) {
                num = num - 12;
            }
        }

        var h = today.getHours() + num;

        if (h >= 12) {
            h = h - 12;
        }
        if (h === 0) {
            h = 12;
        }

        var imprint_string = h + ":" + today.getMinutes();

        if (today.getMinutes().toString().length === 1) {
            imprint_string = imprint_string.substr(0, imprint_string.length - 1) + "0" + imprint_string[imprint_string.length - 1];
        }

        $("#nav-breeding").append(" <div class=\"row\"><div class=\"col-auto\"><span> Imprint " + i + ":</span></div><div class=\"col-auto\"><h4 class=\"breeding-time without_ampm\" id=\"imprint-" + i + "\"/></div></div>");


        $("#imprint-" + i).text(imprint_string)

    }


    window.addEventListener('message', function (e) {
        if (e.data.uid && e.data.type === 'sizeUpdate') {
            var i = document.querySelector('iframe[name="' + e.data.uid + '"]');
            i.style.width = e.data.payload.width;
            i.style.height = e.data.payload.height;
        }
    });

    window.addEventListener('message', function (e) {
        if (e.data.uid && e.data.type === 'sizeUpdate') {
            var i = document.querySelector('iframe[name="' + e.data.uid + '"]');
            i.style.width = e.data.payload.width;
            i.style.height = e.data.payload.height;
        }
    });

    window.addEventListener('message', function (e) {
        if (e.data.uid && e.data.type === 'sizeUpdate') {
            var i = document.querySelector('iframe[name="' + e.data.uid + '"]');
            i.style.width = e.data.payload.width;
            i.style.height = e.data.payload.height;
        }
    });

    window.addEventListener('message', function (e) {
        if (e.data.uid && e.data.type === 'sizeUpdate') {
            var i = document.querySelector('iframe[name="' + e.data.uid + '"]');
            i.style.width = e.data.payload.width;
            i.style.height = e.data.payload.height;
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


var x = 0;

function render() {
    var c = $("#render-canvas")[0].getContext('2d');
    c.clearRect(0, 0, WX, WY);


}