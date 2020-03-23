window.onload = function() {

	// IMG LOAD
	fetch('https://api.unsplash.com/photos/random?&query=nature&client_id=gg5HAC8CpRjv5PSF2lxRfKzFnEKFQvN-Vb-QKNvpNlA&orientation=landscape&squarish')
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
			document.getElementById("user").innerText = "Photo: " + user_name;
			document.getElementById("user").href = user_link;
		});

	// SEASON DETERMINANT
	var geoSuccess = function(position) {
		startPos = position;

		var lat = startPos.coords.latitude;
		var long = startPos.coords.longitude;
		console.log(lat,long);
	};
	navigator.geolocation.getCurrentPosition(geoSuccess);


	// TIME LOADER
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

	// DATE LOADER
	document.getElementById("date").innerHTML = formatAMPM();

	function formatAMPM() {
		var d = new Date(),
			months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
			days = ['Sunday,','Monday,','Tuesday,','Wednesday,','Thursday,','Friday,','Saturday,'];
		// return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
		return months[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
	}
};
