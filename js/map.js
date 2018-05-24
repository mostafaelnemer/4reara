userData=window.sessionStorage.getItem('userData');
console.log(userData)
if(userData){
    userData=JSON.parse(userData);
    console.log('hhhhhhhhhhhhhhhhhhhh')
    console.log(userData)
    if(userData.type=='customer'){
        $("#getAllServices").removeClass('hidden');
    }else{
        $("#getAllOrders").removeClass('hidden');
        $("#user-profile-sidebar a[href='services.html']").addClass('hidden');
    }
}
function initMap(latitudeData,longitudeData) {
    var secheltLoc = new google.maps.LatLng(latitudeData,longitudeData);
    var map = new google.maps.Map(document.getElementById('mapDiv'), {
        zoom: 12,
        center: secheltLoc,
        draggable:false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: 'greedy'
    });

    function initMarkers(map, markerData) {
        var newMarkers = [];
        var marker;
        var label=document.createElement("img");
        for(var i=0; i<markerData.length; i++) {
            label.src=markerData[i].labelSrc;
            marker = new MarkerWithLabel({
                tittle:"",
                map: map,
                draggable: true,
                position: markerData[i].latLng,
                visible: true,
                icon:"img/currentLocation.png",
                labelContent:label,
                labelAnchor:new google.maps.Point(20,50),
                labelClass:'marker-style'
            }),
                boxText = document.createElement("div"),
                infoboxOptions = {
                    content: boxText,
                    disableAutoPan: false,
                    pixelOffset: new google.maps.Size(-100, 0),
                    zIndex: null,
                    alignBottom:true,
                    boxClass:'infobox-wrapper',
                    enableEventPropagation :true,
                    closeBoxMargin: "0px 0px -8px 0px",
                    closeBoxURL:"http://www.google.com/intl/en_us/mapfiles/close.gif",
                    infoBoxClearance: new google.maps.Size(1, 1)
                };

            newMarkers.push(marker);
            boxText.innerHTML ='';//'<div class="infobox-inner"><a href="#"><div class="infobox-image" style="position: relative"><img style="width:50px;" src="'+ markerData[i].imageSrc+'" /><div><span class="infobox-price"></span></div></div></a><div class="infobox-description"><div class="infobox-title"><a href="#">'+markerData[i].name + '</a></div><div class="infobox-location"> </div></div></div>';
            newMarkers[i].infobox = new InfoBox(infoboxOptions);
            /*google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    newMarkers[i].infobox.open(map, this);
                    map.panTo(markerData[i].latLng);
                }
            })(marker, i));*/
           /* marker.addListener('drag',function(event) {
                //console.log(event.latLng.lat());
                //console.log(event.latLng.lng());
            });*/
            var geocoder = new google.maps.Geocoder();
            //console.log(latitudeData);
            //console.log(longitudeData);
            var latitude = parseFloat(latitudeData);
            var longitude = parseFloat(longitudeData);
            var latlng = {lat: latitude, lng: longitude};
            geocoder.geocode({'location': latlng}, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    console.log(latitude,longitude);
                    address=results[0].formatted_address;
                    $("#address").val(address);
                    $("#latitude,#latitude_d").val(latitude);
                    $("#longitude,#longitude_d").val(longitude);
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
            /*map.addListener('click',function(event){
                //console.log(event.latLng.lat());
                //console.log(event.latLng.lng());
                var latlng = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
                marker.setPosition(latlng);
                latitude=event.latLng.lat();
                longitude=event.latLng.lng();

                geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        address=results[0].formatted_address;
                        $("#address,#ar_address").val(address);
                        $("#latitude,#latitude_d").val(latitude);
                        $("#longitude,#longitude_d").val(longitude);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });*/
            /*marker.addListener('dragend',function(event) {
                var latitude = event.latLng.lat();
                var longitude = event.latLng.lng();
                var latlng = {lat: latitude, lng: longitude};
                geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        address=results[0].formatted_address;
                        $("#address").val(address);
                        $("#latitude").val(latitude);
                        $("#longitude").val(longitude);
                    } else {
                        alert('Geocode was not successful for the following reason: ' + status);
                    }
                });
            });*/
            marker.addListener('dragstart',function(event) {
                //console.log(event);
                //console.log("stat"+event.latLng.lat());
                //console.log("stat"+event.latLng.lng());
            });
        }

        return newMarkers;
    }
    markers = initMarkers(map, [
        {
            latLng: new google.maps.LatLng(latitudeData,longitudeData), name: "location", description: "",imageSrc:"img/currentLocation.png",labelSrc:"img/currentLocation.png"
        }
    ]);
 //   $("#getMyLocation").removeAttr('disabled');
}
function showPosition(position){
    /*latitude=position.coords.latitude.toString().slice(0,6);
    longitude=position.coords.longitude.toString().slice(0,6);*/
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    initMap(latitude,longitude);
};
function getLocation(){
    console.log('start to get location ');
    /*if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        //$("#errors").html("Geolocation is not supported by this browser.");
        latitude=30.05;
        longitude=31.25;
        initMap(latitude,longitude);
    }*/
  //  $("#getMyLocation").attr('disabled','disabled');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);


};
function onSuccess(position) {
    console.log('success get location');
    /*latitude=position.coords.latitude.toString().slice(0,6);
    longitude=position.coords.longitude.toString().slice(0,6);*/
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    initMap(latitude,longitude);
}
function onError() {
    console.log('error get location')
    latitude=30.05;
    longitude=31.25;
    initMap(latitude,longitude);
}
/*
getLocation();
$(document).on('click','#getMyLocation',function(){
    getLocation();
});*/
