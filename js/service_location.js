var serviceLocationLatitude = window.sessionStorage.getItem("serviceLocationLatitude");
var serviceLocationLongitude = window.sessionStorage.getItem("serviceLocationLongitude");
var serviceLocationAddress = window.sessionStorage.getItem("serviceLocationAddress");
var userDataLongitude = window.sessionStorage.getItem("userDataLongitude");
var userDataLatitude = window.sessionStorage.getItem("userDataLatitude");
var userDataAddress = window.sessionStorage.getItem("userDataAddress");
userData=window.sessionStorage.getItem('userData');
if(userData){
    userData=JSON.parse(userData);
}
user_id=userData.id
$("#user_id").val(user_id);

if(serviceLocationAddress){
    $("#service_location_delivery_place").html(serviceLocationAddress+' <span class="pull-right"><i class="fa fa-map-marker"></i></span>').attr('data-value',serviceLocationAddress);
    $("#delivery_place_address").val(serviceLocationAddress);
    $("#delivery_place_latitude").val(serviceLocationLatitude);
    $("#delivery_place_longitude").val(serviceLocationLongitude);
}

if(userDataAddress){
    $("#service_location_place_of_delivery").html(userDataAddress+' <span class="pull-right"><i class="fa fa-map-marker"></i></span>').attr('data-value',userDataAddress);
    $("#place_of_delivery_address").val(userDataAddress);
    $("#place_of_delivery_latitude").val(userDataLatitude);
    $("#place_of_delivery_longitude").val(userDataLongitude);
}
//$("#order_details").val().data('value',parcelData.order_details);
console.log(userDataAddress);
if(serviceLocationLatitude&&serviceLocationLongitude&&userDataLatitude&&userDataLongitude){
    destinationA=new google.maps.LatLng(userDataLatitude,userDataLongitude);
    destinationB=new google.maps.LatLng(serviceLocationLatitude,serviceLocationLongitude);
    var MatrixService = new google.maps.DistanceMatrixService();
    MatrixService.getDistanceMatrix({
        origins: [destinationA],
        destinations: [destinationB],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function(matrixResponse,matrixRequest){
        console.log("getDistanceMatrix");
        console.log(matrixResponse);
        console.log(matrixRequest);
        distance=matrixResponse.rows[0].elements[0].distance.text;
        duration=matrixResponse.rows[0].elements[0].duration.text;
        window.sessionStorage.setItem("parcelDistance",distance)
        window.sessionStorage.setItem("parcelDuration",duration)
        $("#distance").html(distance);
        $("#distanceInput").val(distance);
        $("#duration").html(duration);
        $("#durationInput").val(duration);
        cost=0;
        if(parseFloat(distance)<=3){
            cost=3;
        }else{
            cost=((parseFloat(distance)-3)*1)+3;
        }
        $("#costInput").val(cost);
        $("#cost").html(cost+" $")
    });
}