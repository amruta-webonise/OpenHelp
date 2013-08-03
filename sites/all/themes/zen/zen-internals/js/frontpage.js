var path = "/sites/all/themes/zen/zen-internals/";
var startLocationAutocomplete;
var endLocationAutocomplete;
var countryRestrict = { 'country': 'us' };
$(document).ready(function () {
    //var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(39.774769, -102.370605));
    var autocompleteOptions = {
        componentRestrictions: countryRestrict
    }
    //autocomplete.setComponentRestrictions({ 'country': country });
   new google.maps.places.Autocomplete(document.getElementById('from'),autocompleteOptions);
   new google.maps.places.Autocomplete(document.getElementById('to'),autocompleteOptions);


    //new google.maps.places.Autocomplete(document.getElementById('from'));
    //new google.maps.places.Autocomplete(document.getElementById('to'));
    /*slider center alignment*/

    /* for datepicker */
    $("#travelDate").datepicker({
        showOn:"both",
        // showOn: "button",
        buttonImage:path + "images/datePickerIcon.png",
        buttonImageOnly:true,
        buttonText: "Calendar",
        dateFormat:'mm-dd-yy',
        minDate:new Date()
    });


    $('#go').click(function () {

        var fromLocation = $('#from').val();
        var toLocation = $('#to').val()
        var travelDate = $('#travelDate').val()
        var hoursList = $('#departHr').val()

        //check the from & to location is not empty
        if (fromLocation == '' && toLocation === '') {
            alert('Please enter start & end location.');
            $('#from').focus();
            return false;
        } else if (fromLocation === '') {
            alert('Please enter start location.');
            $('#from').focus();
            return false;
        } else if (toLocation === '') {
            alert('Please enter end location.');
            $('#to').focus();
            return false;
        } else if (travelDate == '') {
            alert('Please select date of travel.');
           // $('#travelDate').focus();
            return false;
        } else if (hoursList == '') {
            alert('Please select time of travel.');
            $('#departHr').focus();
            return false;
        } else {
            $('#loader').show();
            return true;
        }
    })

    timeDropDown();

});

function timeDropDown() {
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 60; j += 15) {
            var x = i < 10 ? '0' + i : i;
            var y = j < 10 ? '0' + j : j;

            $('#departHr').append("<option value='" + x + ":" + y +"'>" + x + ':' + y + '</option>');
        }
    }


}