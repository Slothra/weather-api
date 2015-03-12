$(document).ready(function() {

	var city = $('#city');
	var matchedCities = function(response){
		var cityP = ('<p>')
		$.each(response, function(i,value) {
			cityP.text(response[i].name);
			$('.list').append(cityP);
		});

	}

	$('.submit').on('click', function(evt){
		evt.preventDefault();
		$.ajax({
			method: "GET",
			url: "http://autocomplete.wunderground.com/aq?query=" + city.val() + '%',
			dataType: 'json',
			success: matchedCities
		})
	});
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
});
