var serviceData = window.sessionStorage.getItem("serviceData");
console.log(serviceData);
//console.log(serviceData);
if(serviceData){
    console.log('session');
    if(serviceData.type=='parcel'){
        console.log('asasdasd');
        searchOnGoogleMap(serviceData);
    }else{
        //window.location.href="services.html";
    }
}else{
    console.log('notsession');
    id=get('id');
    if(id){
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_services/'+id),
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                if(msg.success){
                    if(msg.result.type=='parcel'){
                        window.sessionStorage.setItem("serviceData", JSON.stringify(msg.result));
                        searchOnGoogleMap(JSON.stringify(msg.result));
                    }else{
                        //window.location.href="services.html";
                    }
                }
            }

        });
    }

}
function searchOnGoogleMap(serviceData) {
    serviceData=JSON.parse(serviceData);
    if(serviceData.type=='parcel'){
        console.log(serviceData)
        $(".loader").show();
        /*$.ajax({
            type: "GET",
            url: 'https://maps.googleapis.com/maps/api/place/textsearch/json?location=29.975843,31.281395&radius=20000 &type=restaurant&query=&key=AIzaSyAkCdsKtwMjpKWDKLUoTb2YegHKVtEG7o0&language=en',
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                console.log(msg)
            }

        });*/
        lang='ar';
        var userDataLongitude=Number(window.sessionStorage.getItem("userDataLongitude")),
            userDataLatitude=Number(window.sessionStorage.getItem("userDataLatitude")),
            deliveryPlaceLatitude=Number(window.sessionStorage.getItem("deliveryPlaceLatitude")),
            deliveryPlaceLongitude=Number(window.sessionStorage.getItem("deliveryPlaceLongitude")),
            deliveryPlaceAddress=Number(window.sessionStorage.getItem("deliveryPlaceAddress"));
        console.log("user location");
        console.log(userDataLongitude);
        console.log(userDataLatitude);
        //$("#place_of_delivery").val().data('value',parcelData.place_of_delivery);
        $("#delivery_place").html(deliveryPlaceAddress).data('value',deliveryPlaceAddress);
        $("#delivery_place_latitude").val(deliveryPlaceLatitude);
        $("#delivery_place_longitude").val(deliveryPlaceLongitude);
        //$("#order_details").val().data('value',parcelData.order_details);
        destinationA=new google.maps.LatLng(userDataLatitude,userDataLongitude);
        console.log('asasdasd');
        console.log(deliveryPlaceAddress);
        if(parcelData.latitude&&parcelData.longitude){
            destinationB=new google.maps.LatLng(parcelData.latitude,parcelData.longitude);
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
            });
        }

    }else{
        //window.location.href="services.html";
    }




}