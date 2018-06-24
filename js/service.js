var serviceData = window.sessionStorage.getItem("serviceData");
//console.log(serviceData);
if(serviceData){
    serviceData=JSON.parse(serviceData);
    if(serviceData.type=='service'){
        serviceSearchOnGoogleMap(serviceData);
    }else{
        window.location.href="services.html";
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
                    if(msg.result.type=='service'){
                        window.sessionStorage.setItem("serviceData", JSON.stringify(msg.result));
                        serviceSearchOnGoogleMap(JSON.stringify(msg.result));
                    }else{
                        window.location.href="services.html";
                    }

                }
            }

        });
    }else{
        window.location.href="services.html";
    }

}
function serviceSearchOnGoogleMap(serviceData) {
    serviceData=serviceData;
    if(serviceData.type=='service'){
        $("#serviceName").html(serviceData.name);
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
            userDataLatitude=Number(window.sessionStorage.getItem("userDataLatitude"));
        console.log("user location");
        console.log(userDataLongitude);
        console.log(userDataLatitude);
        var pyrmont = {lat: userDataLatitude, lng: userDataLongitude};
        //var pyrmont = {lat: 29.888704399999998, lng: 31.291235099999994};
        var service = new google.maps.places.PlacesService(document.createElement('div'));
        service.nearbySearch({
            location: pyrmont,
            radius: 20000,
           //type: [serviceData.google_key],
            keyword: serviceData.google_key,
            language:lang,
            rankby:'distance',
        }, function(response,request){
           /* console.log(lang)
            console.log(serviceData.google_key)
            console.log(response);
            console.log(request);
            console.log(response[0].geometry.location.lat());
            console.log(response[0].geometry.location.lng());
            console.log(response[1].geometry.location.lat());
            console.log(response[1].geometry.location.lng());
            console.log(response[2].geometry.location.lat());
            console.log(response[2].geometry.location.lng());*/
            destinationA=new google.maps.LatLng(userDataLatitude,userDataLongitude);
            otherDestinations=[];
            response.forEach(function (item) {
                otherDestinations.push(new google.maps.LatLng(item.geometry.location.lat(),item.geometry.location.lng()));
            });
            var MatrixService = new google.maps.DistanceMatrixService();
            MatrixService.getDistanceMatrix({
                origins: [destinationA],
                destinations: otherDestinations,
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function(matrixResponse,matrixRequest){
                console.log("getDistanceMatrix");
                console.log(matrixResponse);
                console.log(matrixRequest);
                html="";
                x=0;
                response.forEach(function(item){
                    console.log(otherDestinations[x]);
                    html+='<li class="list-group-item"><a href="javascript:void(0)" class="single-location" data-longitude="'+otherDestinations[x].lng()+'" data-latitude="'+otherDestinations[x].lat()+'" data-address="'+item.vicinity+'" > <div class="col-xs-2 col-sm-2"> <img src="'+item.icon+'" alt="'+item.name+'" style="max-width: 100%" class="img-responsive img-circle" /> </div> <div class="col-xs-10 col-sm-10"> <span class="name">'+item.name+'</span> <div class="clearfix"></div> <span class="visible-xs"> <span class="text-muted">'+item.vicinity+'</span></span> <div class="clearfix"></div><span class="visible-xs"> <span class="text-muted">'+matrixResponse.rows[0].elements[x].distance.text+' - '+matrixResponse.rows[0].elements[x].duration.text+'</span></span> <span class="pull-right"><span class="order-status1 success pull-right"><div class="stars-outer"> <div class="stars-inner" style="width: '+((typeof item.rating!='undefined')?(item.rating*100)/5:'')+'%"></div></div></span></span>  </div> <div class="clearfix"></div> </a></li>';
                    x++;
                });
                $("#services-list").html(html)
            });



        });
    }else{
        window.location.href="services.html";
    }

    //console.log('distance');
    //console.log(getDistanceFromLatLonInKm(userDataLatitude,userDataLongitude,30.5440034,31.1440087))
    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI/180)
    }






   /* var destinationA = new google.maps.LatLng(29.888704399999998, 31.291235099999994);
    var destinationB = new google.maps.LatLng(30.5440034,31.1440087);
    var destinationC = new google.maps.LatLng(30.072007,31.434416000000056);
    var destinationD = new google.maps.LatLng(30.0733324,31.22248509999997);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [destinationA],
        destinations: [destinationB,destinationC,destinationD],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
        }, function(response,request){
            console.log("getDistanceMatrix");
            console.log(response);
            console.log(request);
        });*/
}