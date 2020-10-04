var debug = false;

var WX = 0;
var WY = 0;


$(document).ready(function () {


    var links = {
        "Google": "http://google.com",
        "Dododex": "http://dododex.com",
        "ARK Wiki": "http://ark.gamepedia.com",
        "Breeding Calculator": "http://ark.crumplecorn.com/breeding/"
    };


    $("#debug").click(function () {
        if (debug ? debug = false : debug = true) {
            $("div[class^='row'], div[class*=' row']").css("border", "1px solid rgba(255, 181, 134, 0.50)");
            $("div[class^='col'], div[class*=' col']").css("border", "1px solid rgba(143, 196, 255, 0.50)");
        } else {
            $("div[class^='row'], div[class*=' row']").css("border", "");
            $("div[class^='col'], div[class*=' col']").css("border", "");
        }
    });


    for (var key in links) {

        $("#tab-links").append("<a href='" + links[key] + "' class='list-group-item' style='text-align: center; padding-left: 10vw; padding-right: 10vw;'>" + key + "</a>");
        // $("#tab-links").append("<a href=\"" + links[key] + "\" class=\"list-group-item\" style=\"height: " + link_height.toString() + "%;\">" + key + "</a>");

        $("#dropdown-links").append("<a class=\"dropdown-item\" href=\"" + links[key] + "\">" + key + "</a>");
    }


});


var x = 0;

function render() {
    var c = $("#render-canvas")[0].getContext('2d');
    c.clearRect(0, 0, WX, WY);


}
