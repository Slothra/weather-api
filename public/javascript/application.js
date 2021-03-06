$(document).ready(function(){
	
	// var weather = "http://api.wunderground.com/api/ea66dc7b777b2081/geolookup/conditions/forecast/"
	var cities;
	var newWeather;
	var city = $('#city');
	var matchedCities = function(response){
		cities = response.RESULTS;
		for (i=0, len=cities.length; i<len; i++) {
			$('.list').append('<p><a href="http://api.wunderground.com/api/ea66dc7b777b2081/geolookup/conditions/forecast/' + cities[i].l + '.json">' + cities[i].name + '</a></p>');
			$('.list').addClass('is-visible');
		}
	}

	function clearSearch(){
		$('.weather').empty();
		$('.list').empty();
		$('.weather').removeClass('is-visible');
	}

	function clearList(){
		$('.list').removeClass('is-visible');
		$('.list').hide(100);
		$('.weather').addClass('is-visible');
	}

	var cityWeather = function(data){
		var newWeather = {}
		newWeather.name = data.current_observation.display_location.city;
		newWeather.weather = data.current_observation.weather;
		newWeather.temp_c = data.current_observation.temp_c;
		newWeather.icon_url = data.current_observation.icon_url;
		$('.weather').append('<h2>' + newWeather.name + '</h2><p>Current conditions:<br/>' + newWeather.weather + ' & ' + newWeather.temp_c +' C<br/><br/><img src=' + newWeather.icon_url + '></p>')
		$('.list').removeClass('is-visible');
		$('.list').hide(100);
		$('.weather').addClass('is-visible');
	};

	$('.submit').on('click', function(evt){
		clearSearch();
		$('.list').show(100)
		evt.preventDefault();
		$.ajax({
			method: "GET",
			url: "http://autocomplete.wunderground.com/aq?query=" + city.val(),
			dataType: 'jsonp',
			jsonp: 'cb',
			success: matchedCities
		})
	});


	$('.list').on('click','p a', function(evt){
		evt.preventDefault();
		$.ajax({
			method: "GET",
			url: this,
			dataType: 'json',
			jsonp: 'cb',
			success: cityWeather
		})
		
	});

});