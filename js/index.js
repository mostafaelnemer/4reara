/*
var keyName = window.sessionStorage.key(0); //Get key name
window.sessionStorage.setItem("key", "value"); //Set item
var value = window.sessionStorage.getItem("key");// Get item
window.sessionStorage.removeItem("key"); //Remove Item
window.sessionStorage.clear();//Clear storage
*/
//  window.sessionStorage.clear();
var userData = window.sessionStorage.getItem("userData")
//console.log(userData);
url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);

var errorMessages={
    "email_exist":"The Email Is Already Exist",
    "phone_exist":"The Phone Is Already Exist",
    "success":"Your Operation is success",
    "wrong_phone_or_password":"Wrong Phone Or Password",
    "user_not_active":"This User Not Active ",
    "user_id_required.":"User ID is required",
    "place_of_delivery_address_required.":"Place Of Delivery Address is required",
    "place_of_delivery_latitude_required.":"Place Of Delivery latitude is required",
    "place_of_delivery_longitude_required.":"Place Of Delivery longitude is required",
    "delivery_place_address_required.":"Delivery Place Address is required",
    "delivery_place_latitude_required.":"Delivery Place latitude is required",
    "delivery_place_longitude_required.":"Delivery Place longitude is required",
    "details_required.":"Details is required",
    "distance_required.":"Distance is required",
    "duration_required.":"Duration is required",
    "cost_required.":"Cost is required",
};
function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
includeHTML();
//the url of api requests
var APIURL="http://4reara.almoasherbiz.com/ForeraaAPI/";
//var APIURL="http://localhost/foreraa/public/ForeraaAPI/";

//create route request url
function makeURL(route){
    return APIURL+route;
}

function getMessages(response,element){
    html='<div class="alert '+((response.success)?'alert-success':'alert-danger')+'">';
    message=response.message;
    if(message.length==1){
        html+=((typeof errorMessages[message[0]]=='undefined')?message[0]:errorMessages[message[0]])+'</div>';
        $(element).html(html);
        return'';
    }
    html+='<ul>';
    if(Array.isArray(message)){
       message.forEach(function(item){
          html+='<li>'+((typeof errorMessages[item]=='undefined')?item:errorMessages[item])+'</li>'
       })
    }
    html+='</ul></div>';
    $(element).html(html);
}
// Device Event Listener
$(document).ready(function(){
    document.addEventListener("deviceready",onDeviceReady,false);
});

function updateStatusCallback(response) {
    if(response.status==='connected'){
        //console.log('you are connected');
    }else if(response.status==='not_authorized'){
        //console.log('you are not authorized');
    }else{
        //console.log('you are not authorized and not login');
    }
}
function onDeviceReady() {
    //console.log('Device Is Ready');

   // console.log("start get location ");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    cordova.plugins.locationAccuracy.canRequest(function(canRequest){
        if(canRequest){
            cordova.plugins.locationAccuracy.request(function (success){
                //console.log("Successfully requested accuracy: "+success.message);

            }, function (error){
                //console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                    if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                        cordova.plugins.diagnostic.switchToLocationSettings();
                    }
                }
            }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
        }
    });

    $(document).on('click',"#fb_login",facebookLogin);
    var registerValidator = $("#register-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');

        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            name : {
                required:true,
                minlength : 5
            },
            email : {
                required:true,
                minlength : 5
            },
            phone : {
                required:true,
                minlength : 5
            },
            password : {
                required:true,
                minlength : 5
            },
            confirm_password : {
                required:true,
                minlength : 5,
                equalTo:"#password"
            }
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users'),
                data: $("#register-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        $("#register-form #social").val('no');
                        $("#register-form")[0].reset();
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });

    /*$(document).on('submit',"#register-form",function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users'),
            data: $("#register-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){
                    $("#register-form #social").val('no');
                    $("#register-form")[0].reset();
                }
            }
        });
    });*/
    var loginValidator = $("#login-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            /*$( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );*/
            //$(element).parent().parent().addClass('has-error');
        },
        highlight: function(element) {

            $(element).closest('.form-group').addClass('has-error');

        },
        unhighlight: function(element) {

            $(element).closest('.form-group').removeClass('has-error');

        },
        errorElement: "span",
        rules : {

            phone : {
                required:true,
                minlength : 5
            },
            password : {
                required:true,
                minlength : 5
            }
        },
        messages: {
        },
        submitHandler: function() {

            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/login'),
                data: $("#login-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    $(".loader").hide();
                    if(msg.success){
                        window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                        window.location.href="map.html";
                    }
                }

            });
        }
    });
    $(".cancel").click(function() {
        loginValidator.resetForm();
    });

    /*$(document).on('submit',"#login-form",function(e){
       //alert("asda");
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/login'),
            data: $("#login-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){
                    window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                }
            }

        });
    })*/
}

$(document).on('click','#getMyLocation',function(){
    //console.log("start get location");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
$(document).on('click','#getAllServices',function(){
    $(".loader").show();
    longitude=$("#longitude").val();
    latitude=$("#latitude").val();
    address=$("#address").val();
    if(longitude&&latitude){
        window.sessionStorage.setItem("userDataLongitude", longitude);
        window.sessionStorage.setItem("userDataLatitude", latitude);
        window.sessionStorage.setItem("userDataAddress", address);
    }
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_services'),
        success: function (msg) {
            //getMessages(msg,"#response")
            $(".loader").hide();
            if(msg.success){
                window.sessionStorage.setItem("servicesData", JSON.stringify(msg.result));
                window.location.href="services.html"
            }
        }

    });
});
/*single service start code*/
$(document).on('click','.single-service',function(){
    id=$(this).data('id');
    //window.location.href='service.html?id='+id
    jsonData=$(this).data('json');
     serviceData=JSON.stringify($(this).data('json'));
     //console.log(serviceData);
    window.sessionStorage.setItem("serviceData",serviceData);
     //console.log(serviceData);
     //window.location.href=jsonData.type+'.html?id='+id
     //console.log(jsonData.type+'.html?id='+id);
     window.location.href=jsonData.type+'.html?id='+id
});
/*single service end code*/
$(document).on('click','#place_of_delivery',function(){
    window.location.href="parcel_place_of_delivery.html"
});
$(document).on('click','#delivery_place',function(){
    window.location.href="parcel_delivery_place.html"
});
/*single parcel start code*/

/*single parcel end code*/
 function onSuccess(position){
    //console.log("succsess get location");
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
    var latLong = new google.maps.LatLng(latitude, longitude);
    var mapOptions = {
        center: latLong,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var marker = new google.maps.Marker({
        position: latLong,
        map: map,
        title: 'my location',
        draggable: true,
    });
     var geocoder = new google.maps.Geocoder();
     var latlng = {lat: latitude, lng: longitude};
     geocoder.geocode({'location': latlng}, function(results, status) {
         if (status === google.maps.GeocoderStatus.OK) {
             address=results[0].formatted_address;
             $("#address").val(address);
             $("#latitude,#latitude_d").val(latitude);
             $("#longitude,#longitude_d").val(longitude);
             if(filename=='map.html'){
                 window.sessionStorage.setItem("userDataLongitude", longitude)
                 window.sessionStorage.setItem("userDataLatitude", latitude)
                 window.sessionStorage.setItem("userDataAddress", address)
             }
         } else {
             alert('Geocode was not successful for the following reason: ' + status);
         }
     });
     marker.addListener('drag',function(event) {
         //console.log(event.latLng.lat());
         //console.log(event.latLng.lng());
     });
     map.addListener('click',function(event){
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
                 if(filename=='map.html'){
                     window.sessionStorage.setItem("userDataLongitude", longitude)
                     window.sessionStorage.setItem("userDataLatitude", latitude)
                     window.sessionStorage.setItem("userDataAddress", address)
                 }
             } else {
                 alert('Geocode was not successful for the following reason: ' + status);
             }
         });
     });
     marker.addListener('dragend',function(event) {
         var latitude = event.latLng.lat();
         var longitude = event.latLng.lng();
         var latlng = {lat: latitude, lng: longitude};
         geocoder.geocode({'location': latlng}, function(results, status) {
             if (status === google.maps.GeocoderStatus.OK) {
                 address=results[0].formatted_address;
                 $("#address").val(address);
                 $("#latitude").val(latitude);
                 $("#longitude").val(longitude);
                 if(filename=='map.html'){
                     window.sessionStorage.setItem("userDataLongitude", longitude)
                     window.sessionStorage.setItem("userDataLatitude", latitude)
                     window.sessionStorage.setItem("userDataAddress", address)
                 }
             } else {
                 alert('Geocode was not successful for the following reason: ' + status);
             }
         });
     });
     marker.addListener('dragstart',function(event) {
         //console.log(event);
         //console.log("stat"+event.latLng.lat());
         //console.log("stat"+event.latLng.lng());
     });
     if(document.getElementById('address')&&$("#address").attr('type')!='hidden'){
         var autocomplete = new google.maps.places.Autocomplete(document.getElementById('address'));
         autocomplete.bindTo('bounds', map);
         autocomplete.addListener('place_changed', function() {
             var place = autocomplete.getPlace();
             if(place.geometry){
                 if (place.geometry.viewport) {
                     map.fitBounds(place.geometry.viewport);
                     latitude=place.geometry.location.lat();
                     longitude=place.geometry.location.lng();
                     $("#latitude").val(latitude);
                     $("#longitude").val(longitude);
                 } else {
                     latitude=place.geometry.location.lat();
                     longitude=place.geometry.location.lng();
                     $("#latitude").val(latitude);
                     $("#longitude").val(longitude);
                     map.setCenter(place.geometry.location);
                     map.setZoom(17);  // Why 17? Because it looks good.
                 }
             }
         })
     }


}

 function onError (error){
    alert("the code is " + error.code + ". \n" + "message: " + error.message);
}

function facebookLogin(){
    FB.login(function(response){
        if(response.status=='connected'){
            //console.log("facebookLogin",response);
            getFacebookData();
        }
    },{scope:'email,public_profile,user_location'});
}
function getFacebookData() {
    FB.api('/me?fields=id,name,email',function(response){
        //console.log("getFacebookData",response);
        $("#register-form #social").val('facebook');
        $("#register-form #name").val(response.name);
        $("#register-form #email").val(response.email);
    });
}

function searchOnGoogleMap(serviceData) {
    serviceData=serviceData;
    if(serviceData.type=='parcel'){
        //console.log(serviceData)
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
        userData=window.sessionStorage.getItem('userData');
        if(userData){
            userData=JSON.parse(userData);
        }
        user_id=userData.id
        $("#user_id").val(user_id);
        var userDataLongitude=Number(window.sessionStorage.getItem("userDataLongitude")),
            userDataLatitude=Number(window.sessionStorage.getItem("userDataLatitude")),
            deliveryPlaceLatitude=Number(window.sessionStorage.getItem("deliveryPlaceLatitude")),
            deliveryPlaceLongitude=Number(window.sessionStorage.getItem("deliveryPlaceLongitude")),
            deliveryPlaceAddress=window.sessionStorage.getItem("deliveryPlaceAddress"),
            placeOfDeliveryLatitude=Number(window.sessionStorage.getItem("placeOfDeliveryLatitude")),
            placeOfDeliveryLongitude=Number(window.sessionStorage.getItem("placeOfDeliveryLongitude")),
            placeOfDeliveryAddress=window.sessionStorage.getItem("placeOfDeliveryAddress");
        // console.log("user location");
        // console.log(userDataLongitude);
        // console.log(userDataLatitude);
        // console.log(deliveryPlaceAddress);
        // console.log(deliveryPlaceLatitude);
        // console.log(deliveryPlaceLongitude);
        //$("#place_of_delivery").val().data('value',parcelData.place_of_delivery);
        if(deliveryPlaceAddress){
            $("#delivery_place").html(deliveryPlaceAddress+' <span class="pull-right"><i class="fa fa-map-marker"></i></span>').attr('data-value',deliveryPlaceAddress);
            $("#delivery_place_address").val(deliveryPlaceAddress);
            $("#delivery_place_latitude").val(deliveryPlaceLatitude);
            $("#delivery_place_longitude").val(deliveryPlaceLongitude);
        }

        if(placeOfDeliveryAddress){
            $("#place_of_delivery").html(placeOfDeliveryAddress+' <span class="pull-right"><i class="fa fa-map-marker"></i></span>').attr('data-value',placeOfDeliveryAddress);
            $("#place_of_delivery_address").val(placeOfDeliveryAddress);
            $("#place_of_delivery_latitude").val(placeOfDeliveryLatitude);
            $("#place_of_delivery_longitude").val(placeOfDeliveryLongitude);
        }
        //$("#order_details").val().data('value',parcelData.order_details);
        //console.log(deliveryPlaceAddress);
        if(deliveryPlaceLatitude&&deliveryPlaceLongitude&&placeOfDeliveryLatitude&&placeOfDeliveryLongitude){
            destinationA=new google.maps.LatLng(placeOfDeliveryLatitude,placeOfDeliveryLongitude);
            destinationB=new google.maps.LatLng(deliveryPlaceLatitude,deliveryPlaceLongitude);
            var MatrixService = new google.maps.DistanceMatrixService();
            MatrixService.getDistanceMatrix({
                origins: [destinationA],
                destinations: [destinationB],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function(matrixResponse,matrixRequest){
                // console.log("getDistanceMatrix");
                // console.log(matrixResponse);
                // console.log(matrixRequest);
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

    }else{
        //window.location.href="services.html";
    }
}
$(document).on('click','#saveDeliveryPlace',function(){
    var latitude =$("#latitude").val();
    var longitude = $("#longitude").val();
    var address = $("#address").val();
    window.sessionStorage.setItem("deliveryPlaceLatitude", latitude);
    window.sessionStorage.setItem("deliveryPlaceLongitude", longitude);
    window.sessionStorage.setItem("deliveryPlaceAddress", address);
    //console.log(latitude);
        //console.log(longitude);
    //console.log(window.sessionStorage.getItem("deliveryPlaceAddress"));
    window.location.href="parcel.html";
});
 $(document).on('click','#savePlaceOfDelivery',function(){
    var latitude =$("#latitude").val();
    var longitude = $("#longitude").val();
    var address = $("#address").val();
    window.sessionStorage.setItem("placeOfDeliveryLatitude", latitude);
    window.sessionStorage.setItem("placeOfDeliveryLongitude", longitude);
    window.sessionStorage.setItem("placeOfDeliveryAddress", address);
    //console.log(latitude);
    //console.log(longitude);
    //console.log(address);
    window.location.href="parcel.html";
});
var orderValidator = $("#order-form").validate({
    errorPlacement: function(error, element) {
        // Append error within linked label
        /*$( element )
            .closest( "form" )
            .find( "label[for='" + element.attr( "id" ) + "']" )
            .append( error );*/
        //$(element).parent().parent().addClass('has-error');

    },
    highlight: function(element) {
        //console.log("highlight:");
        //console.log(element);
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').addClass('has-error');
        }else{
            console.log($($(element).data("element")).parent().addClass('has-error'));
            $($(element).data("element")).closest('.form-group').addClass('has-error');
        }


    },
    unhighlight: function(element) {
        //console.log("unhighlight:");
        //console.log(element);
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').removeClass('has-error');
        }else{
            $(element).closest('.form-group').removeClass('has-error');
        }
    },
    errorElement: "span",
    rules : {

        place_of_delivery_address : {
            required:true,
            minlength : 5
        },
        delivery_place_address : {
            required:true,
            minlength : 5
        },
        details : {
            required:true,
            minlength : 5
        },
        duration : {
            required:true,
            minlength : 5
        },
        distance : {
            required:true,
            minlength : 5,
        }
    },
    messages: {
    },
    submitHandler: function() {
        //alert('start');
        //$("#charge-btn").attr("disabled", true);
        $(".loader").show();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders'),
            data:$("#order-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){

                }
                $(".loader").hide();
            }

        });
    }
});

$(document).on('click','.single-location',function(){
   latitude=$(this).data('latitude');
   longitude=$(this).data('longitude');
   address=$(this).data('address');
   window.sessionStorage.setItem("serviceLocationLatitude",latitude)
   window.sessionStorage.setItem("serviceLocationLongitude",longitude)
   window.sessionStorage.setItem("serviceLocationAddress",address)
   window.location.href="service_location.html";

});
var serviceOrderValidator = $("#service-order-form").validate({
    errorPlacement: function(error, element) {
        // Append error within linked label
        /*$( element )
            .closest( "form" )
            .find( "label[for='" + element.attr( "id" ) + "']" )
            .append( error );*/
        //$(element).parent().parent().addClass('has-error');

    },
    highlight: function(element) {
        //console.log("highlight:");
        //console.log(element);
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').addClass('has-error');
        }else{
            //console.log($($(element).data("element")).parent().addClass('has-error'));
            $($(element).data("element")).closest('.form-group').addClass('has-error');
        }


    },
    unhighlight: function(element) {
        //console.log("unhighlight:");
        //console.log(element);
        if($(element).attr("id")=='order_details'){
            $(element).closest('.form-group').removeClass('has-error');
        }else{
            $(element).closest('.form-group').removeClass('has-error');
        }
    },
    errorElement: "span",
    rules : {

        place_of_delivery_address : {
            required:true,
            minlength : 5
        },
        delivery_place_address : {
            required:true,
            minlength : 5
        },
        details : {
            required:true,
            minlength : 5
        },
        duration : {
            required:true,
            minlength : 5
        },
        distance : {
            required:true,
            minlength : 5,
        }
    },
    messages: {
    },
    submitHandler: function() {
        //alert('start');
        //$("#charge-btn").attr("disabled", true);
        $(".loader").show();
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders'),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){

                }
                $(".loader").hide();
            }

        });
    }
});