window.onload = function() {

	// getSeason();
	// var weather_description = localStorage.getItem('weather_type');

	var today = new Date().getHours();
	if (today >= 4 && today <= 12) {
		var imgTime = 'morning';
	}
	if (today >= 12 && today <= 17) {
		var imgTime = 'day';
	}
	if (today >= 17 && today <= 24) {
		var imgTime = 'night';
	}
	if (today >= 0 && today <= 4) {
		var imgTime = 'night';
	}

	dateLoader();

	timeLoader();

	localStorage.setItem('api_store',
		'https://api.unsplash.com/photos/random?' +
		'&client_id=gg5HAC8CpRjv5PSF2lxRfKzFnEKFQvN-Vb-QKNvpNlA&orientation=landscape&squarish&query=' + imgTime +',nature');

	console.log('https://api.unsplash.com/photos/random?' +
		'&client_id=gg5HAC8CpRjv5PSF2lxRfKzFnEKFQvN-Vb-QKNvpNlA&orientation=landscape&squarish&query=' + imgTime +',nature');

	imgLoad();
}

// IMG LOAD
function imgLoad () {
	fetch(localStorage.getItem('api_store'))
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			// IMG
			var imgsrc = data.urls.raw;
			var w = window.innerWidth;
			var h = window.innerHeight;
			var imgrender = 'url(' + imgsrc + '&w=' + w + '&h=' + h + ') no-repeat';
			document.getElementById("bgIMG").style.background = imgrender;
			document.getElementById("bgIMG").style.backgroundSize = "cover";

			// USER CREDIT
			var user_name = data.user.name;
			var user_link = data.user.links.html;
			document.getElementById("user").innerText = user_name;
			document.getElementById("user").href = user_link;

			// COLOR LOAD
			var mainColor = data.color;
			document.body.style.backgroundColor = mainColor;
		});
}

function timeLoader () {
	(function () {
		function checkTime(i) {
			return (i < 10) ? "0" + i : i;
		}

		function startTime() {
			var today = new Date(),
				h = parseInt(checkTime(today.getHours()), 10),
				m = checkTime(today.getMinutes());
			// s = checkTime(today.getSeconds());
			var tag = 'AM';
			checkTime();
			if(h > 12) {
				h -= 12
				tag = 'PM';
			}
			if(h == 0) {
				h = 12
			}
			document.getElementById('time').innerHTML = h + ":" + m;
			// document.getElementById('ampm').innerHTML = tag;
			t = setTimeout(function () {
				startTime()
			}, 60000);
		}
		startTime();
	})();
}

// DATE LOADER
function dateLoader () {
	document.getElementById("date").innerHTML = formatAMPM();

	function formatAMPM() {
		var d = new Date(),
			months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
			days = ['Sunday,','Monday,','Tuesday,','Wednesday,','Thursday,','Friday,','Saturday,'];
		// return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
		return months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
	}
}
// SEASON DETERMINANT
// function getSeason () {
// 	var geoSuccess = function (position) {
// 		startPos = position;
//
// 		var lat = startPos.coords.latitude;
// 		var long = startPos.coords.longitude;
// 		var weather_link = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=caeb41fe8b916eb07088d1cbe4b528f9';
//
// 		fetch(weather_link)
// 			.then((response) => {
// 				return response.json();
// 			})
// 			.then((data) => {
// 				// ASSIGN WEATHER DESCRIPTION
// 				weather_description = data.weather[0].description;
// 				localStorage.setItem('weather_type', weather_description);
// 			});
// 	};
// 	navigator.geolocation.getCurrentPosition(geoSuccess);
// }