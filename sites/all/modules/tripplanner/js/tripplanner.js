//$ = jQuery.noConflict();
$(document).ready(function () {
    $('a#favoriteTrip').fancybox({
        'height':400,
        'width':600
    });
})

//Google Params

var path = "/sites/all/themes/zen/zen-internals/";
var errorMap = false;
var directions = new google.maps.DirectionsService();
var renderer = new google.maps.DirectionsRenderer();
var startLocationAutocomplete;
var endLocationAutocomplete;
var map, transitLayer;
var countryRestrict = { 'country':'us' };
var selectedMode;
// Initialise the map here
function initialize() {

    // set map options
    var mapOptions = {
        zoom:4,
        center:new google.maps.LatLng(39.774769, -102.370605),
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

    // pass param to map
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    //listener to invoke the map action after go button click
    google.maps.event.addDomListener(document.getElementById('go'), 'click', route);
    google.maps.event.addDomListener(document.getElementById('reset'), 'click', route);

    // set default bounds
    var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(39.774769, -102.370605));
    var autocompleteOptions = {
        componentRestrictions:countryRestrict
    }
    //autocomplete.setComponentRestrictions({ 'country': country });
    startLocationAutocomplete = new google.maps.places.Autocomplete(document.getElementById('from'), autocompleteOptions);
    endLocationAutocomplete = new google.maps.places.Autocomplete(document.getElementById('to'), autocompleteOptions);

    startLocationAutocomplete.bindTo('bounds', map);
    endLocationAutocomplete.bindTo('bounds', map);


    //Set transit layer
    transitLayer = new google.maps.TransitLayer();

    // get google transit loaded here
    addDepart();
    route();
}

/**
 * Crate hours drop down here. timings will be between 12 to 11:45
 **/


function addDepart() {
    var selectedHr = $('#selectedHr').val();
    var splitTime = selectedHr.split(':');
    var hours = splitTime[0];
    var minuit = splitTime[1];
    var selected = hours + ':' + minuit;
    //console.log(selected);
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 60; j += 15) {
            var x = i < 10 ? '0' + i : i;
            var y = j < 10 ? '0' + j : j;
            var hour = x + ':' + y;
            var optSelectedHr = (hour == selected) ? 'selected' : '';
            $('#departHr').append("<option value='" + x + ":" + y + "' " + optSelectedHr + ">" + x + ':' + y + '</option>');
        }
    }
}


/**
 * Crate Depart and arrive timings.
 * returns the formatted timings
 **/

function formatAMPM() {

    var departTime = $('#departHr').val();

    var splitTime = departTime.split(':');
    var hours = splitTime[0];
    var minutes = splitTime[1]; //
    var timeFormat = $('#timeFormat').val();
    //console.log('hours ===' + hours);
    //console.log('minutes ===' + minutes);
    // set 24 hr time format here. Important as google does not accept 12 hr format
    if (timeFormat == 'pm') {
        hours = Number(hours) + Number(12);
    }

    //console.log('hours minutes ===' + hours + ':' + minutes + ':00');
    return hours + ':' + minutes + ':00';
}


/**
 *  hide the favorite title text box //basic code written for now
 * We are gonna change this code, when we get the HTML
 */
$('#favTitle').hide('slow');

// Load Map on dom ready
google.maps.event.addDomListener(window, 'load', initialize);


/**
 * Create routing for google map here
 */
function route() {
    var startLocation = $('#from').val();
    var endLocation = $('#to').val();
    var selectedMode = $('#modeOfTransportation').val();
    var timeChosen = formatAMPM();
    var now = new Date();
    /**
     * if day light saving is ON then UTC Offset should be -0400
     * else UTC Offset will be -0500
     * */
    var UTCOffset = ' -0500';

    if ($('#isDST').val() == 1) {
        UTCOffset = ' -0400';
    }

    var data = $('#requiredDateFormat').val() + ' ' + timeChosen + UTCOffset;//now.getTimezoneOffset() ;
    var finalDate = new Date(data);

    if ($("#scheduleType").val() == 2) {

        var request = {
            origin:startLocation,
            destination:endLocation,
            travelMode:google.maps.TravelMode[selectedMode],
            transitOptions:{
                arrivalTime:finalDate
            },
            provideRouteAlternatives:true,
            optimizeWaypoints:true
        };
    } else {
        var request = {
            origin:startLocation,
            destination:endLocation,
            travelMode:google.maps.TravelMode[selectedMode],
            transitOptions:{
                departureTime:finalDate
            },
            provideRouteAlternatives:true,
            optimizeWaypoints:true
        };
    }

    var errorMessage = '';
    var panel = document.getElementById('panel');
    panel.innerHTML = '';

    // Pass all parameters to google map and collect the response
    directions.route(request, function (response, status) {
        $('#loader').hide();
        // Check status

        if (status == google.maps.DirectionsStatus.OK) {
            errorMap = false;
            renderer.setDirections(response);

            renderer.setMap(map);
            renderer.setPanel(panel);
            $('#panel').show();
            $('#tripLoader').hide();
            if (selectedMode == "WALKING" || selectedMode == "BICYCLING") {
                $('#favoriteTrip').hide();
            } else {
                $('#favoriteTrip').show();
            }
        } else {
            errorMap = true;
            renderer.setPanel(null);
            if (startLocation == '' || endLocation == '') {
                errorMessage = 'Please enter Start and End location to plan your trip.'
            } else {
                errorMessage = "We couldn't understand this location.";
                $('#tripLoader').hide();
            }

            $('#favoriteTrip').hide();
            $('#favTitle').hide();
            $('#errorMessage').html("<span style='color: red'>" + errorMessage + "</span>");
            $('#errorMessage').show('slow');
            $('#go').show().delay(5000);
            $('#reset').show().delay(5000);

        }
    });
}

/**
 * Handling validation
 * **/

$(document).ready(function () {

    $('#favoriteTrip').fancybox();
    $('#favoriteTrip').hide();

// handle various validation and events on click of get direction
    $('#go').click(function () {
        var fromLocation = $('#from').val();
        var toLocation = $('#to').val()

        if (fromLocation != '' && toLocation != '') {
            $("#tripLoader").show();
            waiting_timer('go');
        }
        //check the from & to location is not empty. VALIDATIONS
        if (fromLocation == '' && toLocation === '') {
            alert('Please enter start & end location');
            $('#from').focus();
            $('#favoriteTrip').hide();
            event.preventDefault();
        } else if (fromLocation === '') {
            alert('Please enter start location');
            $('#from').focus();
            $('#favoriteTrip').hide();
            event.preventDefault();
        } else if (toLocation === '') {
            alert('Please enter end location');
            $('#to').focus();
            $('#favoriteTrip').hide();
            event.preventDefault();
        } else {
            $('#loader').show();
            return false;
        }
    })

    /**
     * Need to refactor this
     * */
    $('#favoriteTrip').click(function (event) {

        $('#favTitle').show('slow');
        $('#favorite').focus();

        event.preventDefault();
    });

    /**
     * Function to handle save trip fuctionlity.
     * */
    $('#saveTrip').click(function () {

        var tripTitle = $.trim($('#favorite').val());
        $('#favorite').val(tripTitle);

        var checkTitle = /^([a-zA-Z0-9 _-]+)$/.test(tripTitle);

        var fromLocation = $('#from').val();
        var toLocation = $('#to').val()

        if (fromLocation != '' && toLocation != '') {
            var tripData = $('#tripPlannerForm').serializeArray();
            tripData.push({name:'title', value:$('#favorite').val()});
            if (checkTitle == true && errorMap == false) {
                if ($('#uid').val() != 0) {
                    // call to save trip in tripplanner module

                    $.ajax({
                            url:'/tripplanner/save_trip',
                            type:'POST',
                            data:tripData,
                            beforeSend:function () {
                                $('#loader').show();
                                $('#saveTrip').hide();
                            },
                            success:function (data) {

                                $('#favorite').val('');
                                $('#favTitle').hide('slow');
                                $('#loader').hide();
                                data.message = data.message.replace("|", "\n\n")
                                alert(data.message);
                                $('#saveTrip').show();
                                parent.$.fancybox.close();

                            }
                        }
                    )
                }
                else {
                    // If user is not logged in save all data in session and redirect user to login page
                    if (confirm("You have to login/register to save this trip.")) {
                        $.ajax({
                                url:'/tripplanner/get_trip',
                                type:'POST',
                                data:tripData,
                                success:function (data) {
                                    window.location = "/user/login/";
                                }
                            }
                        )
                    }
                }
            } else {
                alert('Please enter valid trip title.');
                $('#favorite').focus();
                $('#favorite').val('');
                return false;

            }
        } else {
            if (fromLocation == '' && toLocation === '') {
                alert('Please enter start & end location');

            } else if (fromLocation === '') {
                alert('Please enter start location');

            } else if (toLocation === '') {
                alert('Please enter end location');

            }
        }

        //event.preventDefault();
    });

    /**
     * hide trip title text box after clicking on cancel
     * */
    $('#cancelTripSaving').click(function () {
        $('#favTitle').hide('slow');
        //event.preventDefault();
    });

    /**
     * Add date picker to page
     * */
    $("#travelDate").datepicker({
        showOn:"both",
        buttonImage:path + "images/datePickerIcon.png",
        buttonImageOnly:true,
        buttonText:"Calendar",
        dateFormat:'mm-dd-yy',
        minDate:new Date()
    });


    /**
     * Remove the date/time option from the page
     * If the transit option changed
     * */

});

/**
 * Change the mode of transit on click
 * */
function changeMode(selected, id) {
    $('.transitMode a').removeClass('active');
    $('#' + id).addClass('active');
    $('#modeOfTransportation').val(selected);

    $('#favoriteTrip').hide();
    selectedMode = selected;
    if (selected == 'TRANSIT') {
        $('#transitWrapper').show('medium');
        if (errorMap != false) {
            if (selectedMode == "WALKING" || selectedMode == "BICYCLING") {
                $('#favoriteTrip').hide();
            } else {
                $('#favoriteTrip').show('medium');
            }
        }
        $('#panel').slideUp();

    } else {
        $('#panel').hide();
        $('#transitWrapper').hide('medium');
        if (selected == "WALKING" || selected == "BICYCLING") {
            $('#favoriteTrip').hide();
        } else {
            $('#favoriteTrip').fadeOut();
        }
    }
}
;

function waiting_timer(id) {
    $('#reset').attr('class', 'reverceIcon disable');
    $('#go').attr('class', 'greenBtn disable');
    $('#tripLoader').show();

    //setting interval of five second and with countdown
    var count = 2, timer = setInterval(function () {
        $("#timeLft").html(count--);
        if (count == 0) clearInterval(timer);
    }, 1000);

    // Disable button for 5 second to reset the API
//    $('#errorMessage').html("<span style='color: red'>Please wait <span id='timeLft'>5</span> seconds for another go.</span>");
    $('#errorMessage').html("");

    setTimeout(function () {
        $('#errorMessage').html('');
        $('#go').attr('class', 'greenBtn');
        $('#reset').attr('class', 'reverceIcon');

    }, 3000);
}

/**
 * Reverse the from and to direction on reverse button
 * */
function reverseDirection() {
    var fromVal = $('#from').val();
    var toVal = $('#to').val();
//    $('#panel').html('');
    if (fromVal != '' || toVal != '') {
        $('#from').val(toVal);
        $('#to').val(fromVal);
        waiting_timer('')
    }
}

function confirmRedirect() {
    if (confirm("You have to login/register to view this trip.")) {
        window.location = "/user/login/";
    } else {
        false;
    }
}


