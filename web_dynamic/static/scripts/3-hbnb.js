$(document).ready(function(){
    let amenitiesChecked = {};

    // Function to update the h4 tag inside the div Amenities with the list of Amenities checked
    function updateAmenities() {
        let amenitiesList = Object.keys(amenitiesChecked).join(', ');
        $('div.Amenities > h4').text(amenitiesList);
    }

    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function() {
        let amenityID = $(this).attr('data-id');
        if ($(this).is(':checked')) {
            // Store the Amenity ID in the variable
            amenitiesChecked[amenityID] = true;
        } else {
            // Remove the Amenity ID from the variable
            delete amenitiesChecked[amenityID];
        }
        // Update the h4 tag inside the div Amenities
        updateAmenities();
    });
	$.ajax({
		type: 'get',
		url: 'http://0.0.0.0:5001/api/v1/status/',
		success: function(data) {
			if (data.status === 'OK') {
				$('DIV#api_status').addClass('available');
			}
			else {
				$('DIV#api_status').removeClass('available');
			}
		}
	});
	$.ajax({
		type: 'POST',
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
		data: '{}',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			const containerDiv = document.geteElementByClass('title_box');
			const placeDivs = containerDiv.getElementByTagName('DIV');
			for (let i = 0; i < placeDivs.length; i++) {
				place = '<article><div><h2>' + `${data[i].name}` + '</h2><div>$' + `${data[i].price_by_night}` + '</div></div><div><div>' + `${data[i].max_guest}` + '</div><div>' + `${data[i].number_rooms}` + '</div><div>' + `${data[i].number_bathrooms}` + '</div></div><div>' + `${data[i].description}` + '</div></article>'
			}
			$('section.places').append('place');
		}
	});		
});
