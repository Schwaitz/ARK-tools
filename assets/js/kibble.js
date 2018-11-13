$(document).ready(function() {


	$.getJSON("./assets/eggs.json", function(data) {
		$.each(data, function(key, val) {

			var string_build = "<div class='row egg-row'><div class='col egg-col'><a class='kibble-link' href='https://ark.gamepedia.com/" + key + "'>" + key + "</a></div>";

			string_build += "<img src='./assets/img/icons/" + val["Vegetable"] + ".png' width='30px' height='30px' alt='" + val["Vegetable"] + "'></img>";
			string_build += "<div class='col egg-col'>" + val["Vegetable"] + "</div>";


			string_build += "<div class='col egg-col'>";

			$.each(val["Other"], function(key_1, val_1){

				string_build += "<div class='row'><img src='./assets/img/icons/" + val_1 + ".png' width='30px' height='30px' alt='" + val_1 + "'></img>";
				string_build += "<div style='padding-left: 10px;'>" + val_1 + "</div></div>";

			});

			string_build += "</div>";



			string_build += "<div class='col egg-col'>";

			$.each(val["Favorites"], function(key_2, val_2){

				string_build += "<div class='row'><a class='kibble-link' href='https://ark.gamepedia.com/" + val_2 + "'>" + val_2 + "</a></div>";

			});

			string_build += "</div>";





			string_build += "</div>";
			$("#egg-data").append(string_build);


		});
	});


});