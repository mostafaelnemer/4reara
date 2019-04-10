/*
var keyName = window.sessionStorage.key(0); //Get key name
window.sessionStorage.setItem("key", "value"); //Set item
var value = window.sessionStorage.getItem("key");// Get item
window.sessionStorage.removeItem("key"); //Remove Item
window.sessionStorage.clear();//Clear storage
*/
//  window.sessionStorage.clear();\
/*start lang js file*/
url = window.location.pathname;
var filename = url.substring(url.lastIndexOf('/')+1);
var selectedLang=(localStorage.getItem("lang")=='ar'||localStorage.getItem("lang")=='en')?localStorage.getItem("lang"):'en';
if(selectedLang=='ar'){
    $('head').append('<link rel="stylesheet" href="css/rtl.css" type="text/css" />');
}
window.strings = (localStorage.getItem("strings"))?JSON.parse(localStorage.getItem("strings")):null;
var strings = (localStorage.getItem("strings"))?JSON.parse(localStorage.getItem("strings")):null;
$.getJSON('lang/'+selectedLang+'.json')
    .done(function (data) {
        window.strings = data;
        var strings = data;
        //console.log(data);
        localStorage.setItem('strings',JSON.stringify(strings));
        includeHTML();
        translate();

    });
/*console.log(localStorage.getItem("lang"));
var imported = document.createElement('script');
if(localStorage.getItem("lang")=="ar"){
    // alert(localStorage.getItem("lang"));
    console.log("middle ar");
    imported.src = 'lang/ar.js';
    document.head.appendChild(imported);

}
else if(localStorage.getItem("lang")=="en"){
    // alert(localStorage.getItem("lang"));
    //var imported = document.createElement('script');
    console.log("middle en");
    imported.src = 'lang/en.js';
    document.head.appendChild(imported);

}else{
    console.log("default en");
    imported.src = 'lang/en.js';
    document.head.appendChild(imported);

}
console.log("end ",localStorage.getItem("lang"));*/

/*end lang js file*/
$("#lang").on('change', function () {
    alert($('#lang option:selected').val());
    localStorage.setItem("lang", $('#lang option:selected').val());
    //alert("feeeettt  " + localStorage.getItem("lang"));
    location.reload();

});

$(document).on('click','#lang', function () {


    var lang= localStorage.getItem('lang');
    //alert(lang);
    if (lang=='ar'){lang='en';}else{lang='ar';}
    //alert(lang);
    localStorage.setItem("lang", lang);
    //alert("feeeettt  " + localStorage.getItem("lang"));
    location.reload();

});
function orderDataHTML(orderData,userData){
    $("#order-title").html(strings['order_number']+' #'+orderData.order_id);
    $("#order_place_of_delivery").removeAttr('trans-lang-html').html('<span class="pull-right"><i class="fa fa-map-marker"></i></span> '+orderData.place_of_delivery_address);
    $("#order_delivery_place").removeAttr('trans-lang-html').html('<span class="pull-right"><i class="fa fa-map-marker"></i></span> '+orderData.delivery_place_address);
    $("#order_details").val(orderData.details)
    $("#distance").html(orderData.distance)
    $("#duration").html(orderData.duration)
    $("#cost").html(orderData.cost);
    //$("#order-image").attr('src',orderData.cost);
    orderImages='';
    orderData.foreraa_order_images.forEach(function(item){
        orderImages+=' <img class="order-image" data-title="'+strings['order_number']+' #'+item.order_id+'" src="'+SITEURL+item.img_dir+item.img+'" alt="">'
    });
    $("#orderImageDiv").html(orderImages);
    delegateHtml='';
    delegateHtml+='<div class="clearfix"></div>';
    delegateHtml+='<div class="clearfix"></div>';
    console.log(orderData.statues);
    console.log(userData);
    if(userData.type=='customer'){
        if(orderData.delegate_id){
            delegateHtml+='<div class="hr-border"></div><div class="clearfix"></div><div class="delegate-section"><div class="col-xs-3"><a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'"><img style="width: 100%" src="'+((orderData.delegate_img_dir&&orderData.delegate_img)?SITEURL+orderData.delegate_img_dir+orderData.delegate_img:SITEURL+'img/Users/default_image.png')+'" class="img-circle" alt=""></a></div> <div class="col-xs-9"><a href="#" data-order-id="'+orderData.order_id+'" class="pull-right chat-now"><i class="fa fa-commenting"></i></a><a class="pull-right call-now" href="tel:'+orderData.delegate_phone+'"><i class="fa fa-phone"></i></a> <a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'"><h4>'+orderData.delegate_name+'</h4></a> <ul class="list-unstyled list-inline star-rating"> ';
            for(x=1;x<=orderData.delegate_rating;x++){
                delegateHtml+='<li><span><i class="fa fa-star"></i></span></li>';
            }
            for(y=x;y<=5;y++){
                delegateHtml+='<li><span><i class="fa fa-star-o"></i></span></li>';
            }
            delegateHtml+='</ul> <a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'">'+strings['view']+'</a> </div><div class="clearfix"></div></div>';
        }else{
            delegateHtml='<div class="clearfix"></div><div class="alert alert-info"><i class="fa fa-times-circle"></i> No Delegate</div>';
        }
        if(orderData.has_delegate_rating==0&&orderData.statues=='closed'){
            delegateHtml+='<div class="clearfix"></div><div class="clearfix" style="height: 10px;"></div><div class="col-md-12"><form id="ratingDelegateForm" action="" method="post"><div id="ratingDelegateForm-response"></div> <input type="hidden" name="user_id" value="'+orderData.user_id+'"> <input type="hidden" name="delegate_id" value="'+orderData.delegate_id+'"> <input type="hidden" id="order_id" name="order_id" value="'+orderData.order_id+'"> <input id="ratings-hidden" name="rating" type="hidden"> <div class="form-group"><textarea class="form-control animated" cols="50" id="new-review" name="comment" placeholder="'+strings['enter_your_review_her']+'" rows="5"></textarea></div>  <div class="text-right"> <div class="stars starrr" data-rating="0"></div> <button class="btn btn-success btn-lg" type="submit">'+strings['save']+'</button></div></form></div>';
        }
        /*if((userData.id==orderData.user_id||(orderData.delegate_id&&orderData.delegate_id==userData.id))&&$.inArray(orderData.statues,['cancel'])!=-1){
            delegateHtml+='<div class="col-lg-12"><button class="cancelOrder btn btn-info btn-block" data-id="'+orderData.order_id+'">'+strings['cancel']+'</button></div>'
        }*/
        if(orderData.statues=='has_invoice'){
            delegateHtml+='<div class="col-lg-12"><button id="confirmInvoice" class=" btn btn-info btn-block" data-customer-id="'+userData.id+'" data-id="'+orderData.order_id+'">'+strings['confirm_invoice']+'</button></div>'
        }

    }else{

        delegateHtml+='<div class="hr-border"></div><div class="clearfix"></div><div class="customer-section"><div class="col-xs-3"><img style="width: 100%" src="'+((orderData.user_img_dir&&orderData.user_img)?SITEURL+orderData.user_img_dir+orderData.user_img:SITEURL+'img/Users/default_image.png')+'" class="img-circle" alt=""></div>';
        delegateHtml+='<div class="col-xs-9"><a href="#" data-order-id="'+orderData.order_id+'" class="pull-right chat-now"><i class="fa fa-commenting"></i></a><a class="pull-right call-now" href="tel:'+orderData.user_phone+'"><i class="fa fa-phone"></i></a> <h4>'+orderData.user_name+'</h4></div><div class="clearfix"></div></div>';
        if(orderData.statues=='new'){
            delegateHtml+='<div class="col-lg-12"><button class="confirmOrder btn btn-info btn-block" data-id="'+orderData.order_id+'">'+strings['confirm']+'</button></div>'
        }
        if(orderData.statues=='inprogress'){
            //delegateHtml+='<div class="col-lg-12"><button id="uploadInvoice" class=" btn btn-info btn-block" data-delegate-id="'+userData.id+'" data-id="'+orderData.order_id+'" title="'+strings['create_invoice']+'">'+strings['create_invoice']+'</div>'
            delegateHtml+='<div class="col-lg-12" id="uploadInvoiceDiv"> <h3>'+strings['invoice']+'</h3><div class="col-lg-6 col-xs-6 col-md-6"><button id="uploadInvoiceGallery" class="btn btn-info btn-block" data-delegate-id="'+userData.id+'" data-id="'+orderData.order_id+'" title="'+strings['gallery']+'">'+strings['gallery']+'</button></div><div class="col-lg-6 col-xs-6 col-md-6"><button id="uploadInvoiceCamera" class="btn btn-info btn-block" data-delegate-id="'+userData.id+'" data-id="'+orderData.order_id+'" title="'+strings['camera']+'">'+strings['camera']+'</button></div><div class="clearfix"></div><div class="clearfix" style="height: 20px;"></div></div>'
        }
        if(orderData.statues=='confirm_invoice'||orderData.statues=='has_invoice'){
            delegateHtml+='<div class="col-lg-12"><div class="col-lg-12"><button id="makeClosed" class=" btn btn-info btn-block" data-delegate-id="'+userData.id+'" data-id="'+orderData.order_id+'" title="'+strings['closed_order']+'">'+strings['closed_order']+'</button></div></div><div class="clearfix"></div><div class="clearfix" style="height: 20px;"></div>'
        }
        if(orderData.has_customer_rating==0&&orderData.statues=='closed'){
            delegateHtml+='<div class="clearfix"></div><div class="clearfix" style="height: 10px;"></div><div class="col-md-12"><form id="ratingCustomerForm" action="" method="post"><div id="ratingCustomerForm-response"></div> <input type="hidden" name="user_id" value="'+orderData.user_id+'"> <input type="hidden" name="delegate_id" value="'+orderData.delegate_id+'"> <input type="hidden" id="order_id" name="order_id" value="'+orderData.order_id+'"> <input id="ratings-hidden" name="rating" type="hidden"> <div class="form-group"><textarea class="form-control animated" cols="50" id="new-review" name="comment" placeholder="'+strings['enter_your_review_her']+'" rows="5"></textarea></div>  <div class="text-right"> <div class="stars starrr" data-rating="0"></div> <button class="btn btn-success btn-lg" type="submit">'+strings['save']+'</button></div></form></div><div class="clearfix"></div><div class="clearfix" style="height: 20px;"></div>';
        }


    }
    if(orderData.statues=='has_invoice'||orderData.statues=='confirm_invoice'||orderData.statues=='closed'){
        delegateHtml+='<div class="col-lg-12"><button id="showInvoiceButton" class=" btn btn-info btn-block">'+strings['show_invoice']+'</button><div class="clearfix"></div><div id="invoiceImage" style="display: none;"><img class="order-image" data-title="'+strings['order_number']+' #'+orderData.order_id+'" style="width:100%;" src="'+SITEURL+orderData.invoice_img_dir+orderData.invoice_img+'"></div></div><div class="clearfix"></div><div class="clearfix" style="height: 20px;"></div>';
    }

    /*if($.inArray( orderData.statues, ['confirm_invoice','closed','has_invoice'] )==-1){
        delegateHtml+='<div class="col-lg-12"><button id="cancel" class=" btn btn-info btn-block">'+strings['cancel']+'</button></div>';
    }*/
    if($.inArray(orderData.statues,['canceled','closed','confirm_invoice','has_invoice'])==-1&&(userData.id==orderData.delegate_id||userData.id==orderData.user_id)){
        delegateHtml+='<div class="col-lg-12"><div class="col-lg-12"><button id="showCancelForm" class="btn btn-info btn-block" data-id="'+orderData.order_id+'">'+strings['show_cancel_form']+'</button><div class="clearfix"></div><div id="cancelOrderDiv" style="display: none;">  <form id="cancelOrderForm" action="" method="post"><input type="hidden" name="current_user_id" value="'+userData.id+'"><input type="hidden" name="order_id" value="'+orderData.order_id+'"><div class="form-group"><textarea class="form-control animated" cols="50" id="cancel_comment" name="cancel_comment" placeholder="'+strings['your_comment']+'" rows="5"></textarea></div> <button class="btn btn-success btn-lg" type="submit">'+strings['cancel']+'</button></form></div></div></div><div class="clearfix"></div><div class="clearfix" style="height: 20px;"></div>'
    }


    delegateHtml+='<div class="clearfix"></div>';
    delegateHtml+='<div class="clearfix"></div>';
    $("#delegate-content").html(delegateHtml);
    if(orderData.has_delegate_rating==0&&orderData.statues=='closed'){
        var ratingDelegateForm = $("#ratingDelegateForm").validate({
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
                $(element).closest('.form-group').addClass('has-error');


            },
            unhighlight: function(element) {
                //console.log("unhighlight:");
                //console.log(element);
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: "span",
            rules : {

                comment : {
                    required:true,
                    minlength : 5
                },
            },
            messages: {
            },
            submitHandler: function() {
                //alert('start');
                //$("#charge-btn").attr("disabled", true);
                $(".loader").show();
                $("#ratingDelegateForm-response").html('');
                if($("#ratings-hidden").val()){
                    $.ajax({
                        type: "POST",
                        url: makeURL('foreraa_users/'+orderData.delegate_id+'/ratingDelegate'),
                        data:$("#ratingDelegateForm").serialize(),
                        success: function (msg) {
                            getMessages(msg,"#ratingDelegateForm-response")
                            if(msg.success){
                                $("#ratingDelegateForm")[0].reset();
                                $("#ratingDelegateForm input").remove();
                                $("#ratingDelegateForm textarea").remove();
                                $("#ratingCustomerForm .stars.starrr").remove();
                                $("#ratingCustomerForm .btn.btn-success.btn-lg").remove();
                                window.location.href="map.html";
                            }
                        }
                    });
                }else{
                    $("#ratingDelegateForm-response").html('<div class="alert alert-danger">Please Select Rating At Less One Star</div>')
                }
                $(".loader").hide();

            }
        });
    }
    if(orderData.has_customer_rating==0&&orderData.statues=='closed'){
        var ratingCustomerForm = $("#ratingCustomerForm").validate({
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
                $(element).closest('.form-group').addClass('has-error');


            },
            unhighlight: function(element) {
                //console.log("unhighlight:");
                //console.log(element);
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement: "span",
            rules : {

                comment : {
                    required:true,
                    minlength : 5
                },
            },
            messages: {
            },
            submitHandler: function() {
                //alert('start');
                //$("#charge-btn").attr("disabled", true);
                $(".loader").show();
                $("#ratingCustomerForm-response").html('');
                if($("#ratings-hidden").val()){
                    $.ajax({
                        type: "POST",
                        url: makeURL('foreraa_users/'+orderData.user_id+'/ratingCustomer'),
                        data:$("#ratingCustomerForm").serialize(),
                        success: function (msg) {
                            getMessages(msg,"#ratingCustomerForm-response")
                            if(msg.success){
                                $("#ratingCustomerForm")[0].reset();
                                $("#ratingCustomerForm input").remove();
                                $("#ratingCustomerForm textarea").remove();
                                $("#ratingCustomerForm .stars.starrr").remove();
                                $("#ratingCustomerForm .btn.btn-success.btn-lg").remove();
                                window.location.href="map.html";
                            }
                        }
                    });
                }else{
                    $("#ratingCustomerForm-response").html('<div class="alert alert-danger">'+strings['please_select_rating']+'</div>')
                }
                $(".loader").hide();

            }
        });
    }
}
function initMap() {
    var orderData = window.sessionStorage.getItem("orderData");
    if(orderData){
        orderData=JSON.parse(orderData);
    }
    var markers=[];
    var directionsService = new google.maps.DirectionsService;
    // var places = new google.maps.places.PlacesService(map);
    var infowindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById('order-map'), {
        zoom: 50,
        center: new google.maps.LatLng(orderData.place_of_delivery_latitude, orderData.place_of_delivery_longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        gestureHandling: 'greedy'
    });
    var myCoords = {
        route: [
            new google.maps.LatLng(Number(orderData.place_of_delivery_latitude),Number(orderData.place_of_delivery_longitude)),
            new google.maps.LatLng(Number(orderData.delegate_lastLatitude),Number(orderData.delegate_lastLongitude)),
            new google.maps.LatLng(Number(orderData.delivery_place_latitude), Number(orderData.delivery_place_longitude))

        ],
    };

    var routesOptions = {
        route: {
            color: '#70cc23'
        }
    };

    var renderer = new google.maps.DirectionsRenderer({
        suppressPolylines: true,
        suppressMarkers: true,
        infoWindow: infowindow,
        polylineOptions: {
            strokeColor: '#C83939',
            strokeOpacity: 0,
            strokeWeight: 1,
            icons: [{
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#C83939',
                    scale: 3,
                    strokeOpacity: 1
                },
                offset: '0',
                repeat: '15px'
            }]
        }

    });

    function renderDirections(result, color, course) {
        renderer.setDirections(result);
        renderer.setMap(map);
        renderDirectionsPolylines(result, color, course);
        console.log(renderer.getDirections());
    }
    var polylineOptions = {
        strokeColor: '#C83939',
        strokeOpacity: 1,
        strokeWeight: 4
    };

    function renderDirectionsPolylines(response, color, course) {
        var polylines = [];
        polylineOptions.strokeColor = color;
        for (var i = 0; i < polylines.length; i++) {
            polylines[i].setMap(null);
        }
        var legs = response.routes[0].legs;
        for (i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            for (j = 0; j < steps.length; j++) {
                var nextSegment = steps[j].path;
                var stepPolyline = new google.maps.Polyline(polylineOptions);
                for (k = 0; k < nextSegment.length; k++) {
                    stepPolyline.getPath().push(nextSegment[k]);
                }
                stepPolyline.setMap(map);
                polylines.push(stepPolyline);
                google.maps.event.addListener(stepPolyline, 'click', function(evt) {
                    infowindow.setContent("you clicked on " + course + "<br>" + evt.latLng.toUrlValue(6));
                    infowindow.setPosition(evt.latLng);
                    infowindow.open(map);
                })
            }
        }
    }

    function drawMarkers(position, color, course) {
        if(myCoords.route[0].lat()===position.lat()&&myCoords.route[0].lng()===position.lng()){
            console.log('first');
            title=strings['place_of_delivery'];
            markerPath='img/marker-shop.png';
            /* markerPath={
                 path: google.maps.SymbolPath.CIRCLE,
                 scale: 5,
                 fillColor: color,
                 fillOpacity: 1,
                 strokeWeight: 0,
                 image: ''
             };*/
        }else if(myCoords.route[myCoords.route.length-1].lat()===position.lat()&&myCoords.route[myCoords.route.length-1].lng()===position.lng()){
            console.log('last');
            title=strings['delivery_place'];
            markerPath='img/marker-home.png';
        }else if(myCoords.route.length>=2&&myCoords.route[1].lat()===position.lat()&&myCoords.route[1].lng()===position.lng()){
            console.log('delegate');
            title=strings['delegate_position'];
            markerPath='img/marker-delegate.png';
        }
        var marker = new google.maps.Marker({
            position: position,
            clickable: true,
            title: title,
            label: {
                text: course,
                fontSize: "0px"
            },
            icon: markerPath,
            map: map
        });
        markers.push(marker);
        redirectTo(marker, marker.label.text);
    }

    function buildPath(origin, destination, wayPoints, color, route) {
        directionsService.route({
                origin: origin,
                destination: destination,
                waypoints: wayPoints,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            },
            function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    renderDirections(result, color, route);
                }
            });
        var labelPosition = setLabelPosition(route);
        console.log(labelPosition, 'labelPosition');
    }

    function redirectTo(element, identifier) {
        google.maps.event.addListener(element, 'click', function(evt) {

            console.log(evt.latLng.lat(),evt.latLng.lng())
            console.log(myCoords.route[0].lat(),myCoords.route[0].lng())
            if(myCoords.route[0].lat()===evt.latLng.lat()&&myCoords.route[0].lng()===evt.latLng.lng()){
                console.log('first');
                if(userData.type=='delegate'){
                    $(".loader").show();
                    navigator.geolocation.getCurrentPosition(function(currentPosition){
                        var longitude = currentPosition.coords.longitude;
                        var latitude = currentPosition.coords.latitude;
                        var geocoder = new google.maps.Geocoder();
                        var latlng = {lat: latitude, lng: longitude};
                        geocoder.geocode({'location': latlng}, function(results, status) {
                            $(".loader").hide();
                            if (status === google.maps.GeocoderStatus.OK) {
                                address=results[0].formatted_address;
                                launchnavigator.navigate(orderData.place_of_delivery_address, {
                                    start: address,
                                    enableDebug: true,
                                    successCallback: function(){},
                                    errorCallback: function(){}
                                });
                                return false;
                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                        });

                    }, onError)
                }

            }else if(myCoords.route[myCoords.route.length-1].lat()===evt.latLng.lat()&&myCoords.route[myCoords.route.length-1].lng()===evt.latLng.lng()){
                console.log('last');
                if(userData.type=='delegate'){
                    $(".loader").show();
                    navigator.geolocation.getCurrentPosition(function(currentPosition){
                        var longitude = currentPosition.coords.longitude;
                        var latitude = currentPosition.coords.latitude;
                        var geocoder = new google.maps.Geocoder();
                        var latlng = {lat: latitude, lng: longitude};
                        geocoder.geocode({'location': latlng}, function(results, status) {
                            $(".loader").hide();
                            if (status === google.maps.GeocoderStatus.OK) {
                                address=results[0].formatted_address;
                                launchnavigator.navigate(orderData.delivery_place_address, {
                                    start: address,
                                    enableDebug: true,
                                    successCallback: function(){},
                                    errorCallback: function(){}
                                });

                                return false;
                            } else {
                                alert('Geocode was not successful for the following reason: ' + status);
                            }
                        });

                    }, onError)
                }

            }else if(myCoords.route.length>=2&&myCoords.route[1].lat()===evt.latLng.lat()&&myCoords.route[1].lng()===evt.latLng.lng()){
                console.log('delegate');
            }
        })
    };

    function setLabelPosition(course) {
        switch (course) {
            case 'route':
                return 'labelAnchor: new google.maps.Point(90,20))';
                break;
        }
    }

    Object.keys(myCoords).forEach(function(key) {
        var curentOrigin = myCoords[key][0],
            curentDestination = myCoords[key][myCoords[key].length - 1],
            wayPoints = [],
            color = routesOptions[key].color;
        for (var j = 1; j < myCoords[key].length - 1; j++) {
            wayPoints.push({
                location: myCoords[key][j],
                stopover: true
            });
            if (j === myCoords[key].length - 2) {
                console.log(curentOrigin)
                buildPath(curentOrigin, curentDestination, wayPoints, color, key);
            }
        }
        for (var j = 0; j < myCoords[key].length; j++) {
            drawMarkers(myCoords[key][j], color, key);
        }
    });
    $(document).on('click','[href="#Location"]',function(){
        console.log('href="#Location"')
        map.setZoom(15);
    })
    setInterval(function(){

        $.ajax({
            type: "GET",
            url: makeURL('foreraa_orders/'+orderData.order_id),
            success: function (msg) {
                if(msg.success){
                    orderData=msg.result;
                    markers[1].setPosition( new google.maps.LatLng(orderData.delegate_lastLatitude,orderData.delegate_lastLongitude));
                    window.sessionStorage.setItem("orderData",JSON.stringify(orderData));
                }
            }

        });
    },5000)

}
function translate(){
$("[trans-lang-html]").each(function () {
    //console.log($(this).attr('trans-lang-html'));
    //console.log(strings[$(this).attr('trans-lang-html')]);
    $(this).html(strings[$(this).attr('trans-lang-html')]);
    $(this).removeAttr('trans-lang-html')
})
$("[trans-lang-placeholder]").each(function () {
    //console.log(strings[$(this).attr('trans-lang-placeholder')]);
    $(this).attr('placeholder', strings[$(this).attr('trans-lang-placeholder')]);
    $(this).removeAttr('trans-lang-placeholder')
});
}
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: makeURL('appSettings'),
        success: function (msg) {
            if(msg.success){
                window.sessionStorage.setItem("appSettings", JSON.stringify(msg.result));
                $("#youtube_link").attr('href',msg.result.youtube_link);
            }
        }
    });

});


var userData = window.sessionStorage.getItem("userData");
var appSettings= window.sessionStorage.getItem("appSettings");
if(appSettings){
    appSettings=JSON.parse(appSettings);
    console.log(appSettings)
    $("#youtube_link").attr('href',appSettings.youtube_link);
}
//console.log(userData);
if(userData){
    userData=JSON.parse(userData);
    user_id=userData.id
    $("#user_id,.user_id").val(user_id);
}
var $element = $(".innerpage-section-padding div");
var lastHeight = $(".innerpage-section-padding div").css('height');
function checkForChanges()
{
    if ($element.css('height') != lastHeight)
    {
        windowHeight=$(window).height();
        elementHeight=$element.height();
        minHeight=(windowHeight>elementHeight)?windowHeight:elementHeight;
        console.log(filename)
        if(filename=='single-order-chats.html'||filename=='map.html'){
            //$(".innerpage-section-padding").css({"min-height":minHeight-100})
            $(".innerpage-section-padding").css({"min-height":minHeight+50,"background":"#e0e0de"})
        }else{
            $(".innerpage-section-padding").css({"min-height":minHeight+50,"padding":"40px 0px 50px"})
        }

        lastHeight = $element.css('height');
    }

    setTimeout(checkForChanges, 500);
}
checkForChanges();
if(filename=='single-order-chats.html'||filename=='map.html'){
    //$(".innerpage-section-padding").css({"min-height":$(window).height()-100})
    $(".innerpage-section-padding").css({"min-height":$(window).height()+50,"background":"#e0e0de"})
}else{
    console.log('here');
    $(".innerpage-section-padding").css({"min-height":$(window).height()+50,"padding":"40px 0px 50px"})
}
//console.log(userData);

function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
        return decodeURIComponent(name[1]);
}
function reloadSingleOrder(){
    userData=window.sessionStorage.getItem('userData');
    if(userData){
        userData=JSON.parse(userData);
    }
    orderData=window.sessionStorage.getItem('orderData');
    if(orderData){
        orderData=JSON.parse(orderData);
    }
    user_id=userData.id
    order_id=orderData.order_id;
    if(user_id&&order_id){
        if(userData.type=='customer'){
            if(user_id){
                $.ajax({
                    type: "GET",
                    url: makeURL('foreraa_orders/'+order_id+'?user_id='+user_id),
                    success: function (msg) {
                        if(msg.success){
                            window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                            orderData=msg.result;
                            orderDataHTML(orderData,userData);
                            addRating();
                            initMap();
                        }

                    }
                });
            }
        }else{
            $.ajax({
                type: "GET",
                url: makeURL('foreraa_orders/'+order_id+'?delegate_id='+user_id),
                success: function (msg) {
                    if(msg.success){
                        window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                        orderData=msg.result;
                        orderDataHTML(orderData,userData);
                        addRating();
                        initMap();
                    }

                }
            });
        }
    }
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
                    if (this.status == 0) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            translate();
//            elmnt.find($("[trans-lang-html]").each(function () {
//                console.log(strings[$(this).attr('trans-lang-html')]);
//                $(this).html(strings[$(this).attr('trans-lang-html')]);
//        }));
//        $("[trans-lang-html]").each(function () {
//                console.log(strings[$(this).attr('trans-lang-html')]);
//                $(this).html(strings[$(this).attr('trans-lang-html')]);
//        })
//elmnt.find("[trans-lang-html]").each(function () {
//                console.log(strings[$(this).attr('trans-lang-html')]);
//                $(this).html(strings[$(this).attr('trans-lang-html')]);
//        });
            
            /*exit the function:*/
            return;
        }
    }
};

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
function formatTime(date) {
    var hr = date.getHours();
    var min = date.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }if(hr==12&&min>0){
        ampm="pm"
    }
    return hr + ":" + min + ampm
}
function statusIcon(statues) {
    switch (statues){
        case 'new':
            return 'fa-times-circle'
            break;
        case 'inprogress':
            return 'fa-spinner';
            break;
        case 'has_invoice':
            return 'fa-bars';
            break;
        case 'confirm_invoice':
            return 'fa-check-circle';
            break;
        case 'canceled':
            return 'fa-times-circle'
            break;
        case 'closed':
            return 'fa-check'
            break;
    }
}
//the url of api requests
var SITEURL="http://4reraa.com/";
var APIURL="http://4reraa.com/ForeraaAPI/";
//var APIURL="http://localhost/foreraa/public/ForeraaAPI/";
console.log(APIURL);
//create route request url
function makeURL(route){

    return APIURL+route;
}

function getMessages(response,element){
    messagesText='';
    messageTitle='';
    messageButton='';
    messageTitle=(response.success)?strings['success_title']:strings['error_title'];
    messageButton=strings['ok'];
    html='<div class="alert '+((response.success)?'alert-success':'alert-danger')+'">';
    message=response.message;
    if(message.length==1){
        messagesText+=(messagesText.length)?"\n"+((typeof strings[message[0]]=='undefined')?message[0]:strings[message[0]]):((typeof strings[message[0]]=='undefined')?message[0]:strings[message[0]]);
        html+=((typeof strings[message[0]]=='undefined')?message[0]:strings[message[0]])+'</div>';
        $(element).html(html);
        if(navigator.notification) {
            navigator.notification.alert(
                messagesText,  // message
                function () {
                    console.log('alert callback');
                },         // callback
                messageTitle,            // title
                messageButton                  // buttonName
            );
        }
        return'';
    }
    html+='<ul>';
    if(Array.isArray(message)){
       message.forEach(function(item){
          messagesText+=(messagesText.length)?"\n"+((typeof strings[item]=='undefined')?item:strings[item]):((typeof strings[item]=='undefined')?item:strings[item]);
          html+='<li>'+((typeof strings[item]=='undefined')?item:strings[item])+'</li>'
       })
    }
    html+='</ul></div>';
    //$(element).html(html);
    if(navigator.notification){
        navigator.notification.alert(
            messagesText,  // message
            function(){
                console.log('alert callback');
            },         // callback
            messageTitle,            // title
            messageButton                  // buttonName
        );
    }

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
// Transaction error callback
//
function errorDB(tx, err) {
    console.log("Error processing SQL: "+err);
}

// Transaction success callback
//
function successDB() {
    console.log("success!");
}

function onDeviceReady() {

	       var fb_success = function (data) {};
            var fb_fail = function (data) {};
            facebookConnectPlugin.activateApp(fb_success, fb_fail);
   /* console.log('window.cordova && window.cordova.plugins.keyboard=1=');
    console.log(Keyboard);
    if (typeof Keyboard.shrinkView!='undefined') {
        Keyboard.shrinkView(true);
        Keyboard.show();
        console.log('window.cordova && window.cordova.plugins.keyboard=2=');
    }*/

    goHome=0;
    /*document.addEventListener('keyboardDidHide', function (e) {
        e.preventDefault();
        console.log('keyboardDidHide');
        // Describe your logic which will be run each time keyboard is closed.
    },false);
    document.addEventListener('keyboardWillHide', function (e) {
        e.preventDefault();
        console.log('keyboardWillHide');
        // Describe your logic which will be run each time when keyboard is about to be closed.
    },false);*/
    document.addEventListener("backbutton", function(){
        switch (filename){
            case 'single-order-chats.html':
                window.location.href='single-order.html';
                break;
            case 'single-order.html':
                window.location.href='my-orders.html';
                break;
            case 'map.html':
                if(goHome>0){
                    navigator.app.exitApp();
                }
                window.plugins.toast.showShortTop(strings['click_to_close'], function(a){console.log('toast success: ' + a);goHome++;}, function(b){alert('toast error: ' + b)})
                break;
            default:
                window.location.href='index.html';

        }
    }, false);
    if(navigator.connection.type=='none'){
        if(navigator.notification) {
            navigator.notification.alert(
                strings['open_internet_connection'],  // message
                function () {
                    if (window.cordova && window.cordova.plugins.settings) {
                        console.log('openNativeSettingsTest is active');
                        window.cordova.plugins.settings.open("wifi", function() {
                                console.log('opened settings');
                            },
                            function () {
                                console.log('failed to open settings');
                            }
                        );
                    } else {
                        console.log('openNativeSettingsTest is not active!');
                    }
                },         // callback
                strings['error'],            // title
                strings['ok']                  // buttonName
            );
        }
    }
    if(typeof cordova!='undefined'){
        cordova.plugins.locationAccuracy.canRequest(function(canRequest){
            if(canRequest){
                cordova.plugins.locationAccuracy.request(function (success){
                    console.log("Successfully requested accuracy: "+success.message);
                }, function (error){
                    console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
                    if(error.code !== cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                        if(window.confirm(strings['filed_open_location'])){
                            cordova.plugins.diagnostic.switchToLocationSettings();
                        }
                    }
                }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
            }else{
                // request location permission and try again
            }
        });
    }

    if(userData&&appSettings&&userData.type=='delegate'&&userData.balance<=appSettings.delegate_limit_cash){
        $( ".page-cover" ).after('<div id="delegate-limited-message"><span>'+strings['delegated_limit_message']+'</span> <a href="payment_methods.html">'+strings['from_her']+'</a></div>');
    }

    //$( ".page-cover" ).after( ' <div id="loading" style="height:60px;" class="text-center"><img src="img/loading.gif" alt="" style="height: 35px;width:  35px;margin-top:  20px;"></div>' );

    //console.log(window.location.href);
    //console.log(window.pageYOffset)
    //window.scrollBy(0, 60);
    var db = window.openDatabase("foreraa_app.db", "1.0", "Foreraa App", 200000);
    console.log('db');
    db.transaction(function(tx){
        query='CREATE TABLE IF NOT EXISTS foreraa_app_user (id unique, username,password)';
        tx.executeSql(query);
        query='SELECT * FROM foreraa_app_user WHERE id=?';
        tx.executeSql(query,[1],function(tx, res){
            if(res.rows.length){
                userDataDB=res.rows[0]
                console.log(userDataDB);
                $.ajax({
                    type: "POST",
                    url: makeURL('foreraa_users/login'),
                    data: {"phone":userDataDB.username,"password":userDataDB.password},
                    success: function (msg) {
                        $(".loader").hide();
                        if(msg.success){
                            window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                            if(!userData){
                                window.location.href="map.html";
                            }
                        }
                    }
                });
            }

        });
        //console.log(query);
    },errorDB,successDB);
    /*function populateDB(tx) {
        /!*query='DROP TABLE IF EXISTS DEMO';
        tx.executeSql(query);
        console.log(query);
        query='CREATE TABLE IF NOT EXISTS DEMO (id unique, data)';
        tx.executeSql(query);
        console.log(query);
        query='INSERT INTO DEMO (id, data) VALUES (1, "First row")';
        tx.executeSql(query);
        console.log(query);
        query='INSERT INTO DEMO (id, data) VALUES (2, "Second row")';
        tx.executeSql(query);
        console.log(query);*!/
        query='SELECT * FROM DEMO WHERE id=?';
        tx.executeSql(query,[1],function(tx, res){
            console.log(tx);
            console.log(res);
            for(var iii = 0; iii < res.rows.length; iii++)
            {
                console.log(res.rows.item(iii).id);
                console.log(res.rows.item(iii).data);
            }
        });
        console.log(query);
    }


    db.transaction(populateDB, errorCB, successCB);*/
    /*if ("Notification" in window) {
        Notification.requestPermission(function (permission) {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
                /!*cordova.plugins.notification.local.schedule({
                    title: 'My first notification',
                    text: 'Thats pretty easy...',
                    foreground: true
                });*!/
                /!*var notification = new Notification("My title", {
                    tag: 'message1',
                    body: "My body"
                });*!/
                /!*notification.onshow  = function() { console.log('show'); };
                notification.onclose = function() { console.log('close'); };
                notification.onclick = function() { console.log('click'); };*!/
            }
        });
    }*/
    if ("FirebasePlugin" in window) {
        /*cordova.plugins.notification.local.schedule({
            title: 'title',
            text: 'body',
            action: 'my-orders.html',
            foreground: true
        });*/
        cordova.plugins.notification.local.on("click", function (notification, state) {
            console.log('notification');
            console.log(notification);
            console.log('state');
            console.log(state);
            console.log(notification.id + " was clicked");
            console.log(notification.action);
            if(notification.action){
                window.location.href=notification.action;
            }
        }, this)
        window.FirebasePlugin.getToken(function(token) {
            // save this server-side and use it to push notifications to this device
            console.log('getToken');
            console.log(token);
            if(userData){
                $.ajax({
                    type: "POST",
                    url: makeURL('foreraa_users/'+userData.id+'/saveToken'),
                    data: {"firebaseToken":token},
                    success: function (msg) {

                    }
                });
            }
        }, function(error) {
            console.log('getToken');
            console.error(error);
        });
        window.FirebasePlugin.onTokenRefresh(function(token) {
            // save this server-side and use it to push notifications to this device
            console.log('onTokenRefresh');
            console.log(token);
            if(userData){
                $.ajax({
                    type: "POST",
                    url: makeURL('foreraa_users/'+userData.id+'/saveToken'),
                    data: {"firebaseToken":token},
                    success: function (msg) {

                    }
                });
            }
        }, function(error) {
            console.log('onTokenRefresh');
            console.error(error);
        });
        window.FirebasePlugin.onNotificationOpen(function(notificationData) {
            console.log('notification');
            console.log(notificationData);
            /*var notification = new Notification("My title", {
                tag: 'message1',
                body: notificationData.body
            });*/
            cordova.plugins.notification.local.schedule({
                title: (notificationData.title)?notificationData.title:'custom title',
                text: (notificationData.body)?notificationData.body:'custom body',
                action: (notificationData.action)?notificationData.action:null,
                foreground: true
            });
           // notification.onclick = function() { console.log('click'); };
        }, function(error) {
            console.log('notification');
            console.error(error);
        });
        window.FirebasePlugin.hasPermission(function(data){
            console.log('hasPermission');
            console.log(data.isEnabled);
        });
    }


    if(userData){
        changeData=setInterval(function(){
            try
            {
                userData=JSON.parse(userData);
            }
            catch(e)
            {
                // handle error
            }

            if($("#userImage").length){
                $("#logoutMenu").removeClass('hidden');
                $("#userImage").attr('src',userData.image);
                userNameHtml=(userData.type=='delegate')?'<i id="delegateStatues" class="fa fa-circle '+userData.delegateData.status+'"></i>'+userData.name:+userData.name;
                $("#userName").html(userNameHtml);
                if(userData.type=='customer'){
                    $("#delegateRatings").removeClass('hidden')
                }else{
                    $("#paymentMethods").removeClass('hidden')
                    if(userData.delegateData.status=='online'){
                        $("#makeOffline").removeClass('hidden');
                    }else{
                        $("#makeOnline").removeClass('hidden');
                    }
                    $("#availableOrdersMenu").removeClass('hidden')
                }
                clearInterval(changeData);
            }
        },300)
        if(userData.type=='customer'){
            $("#getAllServices").removeClass('hidden');
        }else{
            $("#getAllOrders").removeClass('hidden');
            $("#serviceMenu").addClass('hidden');
        }

    }else{
        changeData=setInterval(function() {
            if($("#userImage").length) {
                $("#serviceMenu,#complaintsMenu,#myOrdersMenu,#availableOrdersMenu,#myAccountMenu").addClass('hidden');
            }
        },300);
    }
    //console.log('Device Is Ready');

   // console.log("start get location ");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
   /*cordova.plugins.locationAccuracy.canRequest(function(canRequest){
       if(canRequest){
           cordova.plugins.locationAccuracy.request(function (success){
               //console.log("Successfully requested accuracy: "+success.message);

           }, function (error){
               //console.error("Accuracy request failed: error code="+error.code+"; error message="+error.message);
               if(error.code !==facebookLogin cordova.plugins.locationAccuracy.ERROR_USER_DISAGREED){
                   if(window.confirm("Failed to automatically set Location Mode to 'High Accuracy'. Would you like to switch to the Location Settings page and do this manually?")){
                       cordova.plugins.diagnostic.switchToLocationSettings();
                   }
               }
           }, cordova.plugins.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY);
       }
   });
*/
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
            },
            term_condition : {
                required:true,
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
                        window.location.href="confirm_phone.html";
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    var registerValidator = $("#forget-password-form").validate({
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
                url: makeURL('foreraa_users/forgetPassword'),
                data: $("#forget-password-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){

                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    var registerValidator = $("#confirm-code-form").validate({
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

            confirm_code : {
                required:true,
                minlength : 5
            },
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            code=$("#confirm_code").val();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/ActiveByCode/'+code),
                data: $("#confirm-code-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        setTimeout(function(){
                            window.location.href="index.html";
                        },3000)
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    var registerValidator = $("#resend-code-form").validate({
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
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            code=$("#confirm_code").val();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/resendCode'),
                data: $("#resend-code-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        setTimeout(function(){
                            window.location.href="confirm_phone.html";
                        },3000)
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    $(".cancel").click(function() {
        registerValidator.resetForm();
    });
    /*complaint*/
    var addComplaint = $("#add-complaint-form").validate({
        errorPlacement: function(error, element) {
            // Append error within linked label
            $( element )
                .closest( "form" )
                .find( "label[for='" + element.attr( "id" ) + "']" )
                .append( error );
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
            complaint : {
                required:true,
                minlength : 50
            },
        },
        messages: {
        },
        submitHandler: function() {
            //alert('start');
            //$("#charge-btn").attr("disabled", true);
            $(".loader").show();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_complaints'),
                data: $("#add-complaint-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    if(msg.success){
                        $("#add-complaint-form")[0].reset();
                    }
                    $(".loader").hide();
                }
            });
        }
    });
    /*complaint*/
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
                    getMessages(msg,"#response");
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
            phone=$("#login-form input[name='phone']").val();
            password=$("#login-form input[name='password']").val();
            $.ajax({
                type: "POST",
                url: makeURL('foreraa_users/login'),
                data: $("#login-form").serialize(),
                success: function (msg) {
                    getMessages(msg,"#response")
                    $(".loader").hide();
                    if(msg.success){
                        db.transaction(function(tx){
                            console.log('msg.success');
                            console.log(msg);
                            tx.executeSql('INSERT INTO foreraa_app_user (id, username,password) VALUES (1, ?,?)',[phone,password]);
                            window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                            window.location.href="map.html";
                        }, errorDB, successDB);

                    }
                }

            });
        }
    });
    function successHandler(result){
        console.log("SUCCESS: \r\n"+result );
    }
    function errorHandler(result){
        console.log("ERORR: \r\n"+result );
    }
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
    //logout
    $(document).on('click','#logoutMenu',function(e){
        e.preventDefault();
        db.transaction(function(tx){
            query='DELETE FROM foreraa_app_user WHERE id=?';
            tx.executeSql(query,[1]);
            window.sessionStorage.removeItem("userData");
            window.location.href="index.html";
        });

    });
}

$(document).on('click','#getMyLocation',function(){
    //console.log("start get location");
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
$(document).on('click','#getAllOrders',function(e){
    e.preventDefault();
    window.location.href="delegate-orders.html";
})
$(document).on('click','#getAllServices,#serviceMenu',function(e){
    e.preventDefault();
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
        url: makeURL('foreraa_services?Lang='+selectedLang),
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
function saveLocationSession(lastLongitude,lastLatitude){
    window.sessionStorage.setItem("lastLongitude", lastLongitude);
    window.sessionStorage.setItem("lastLatitude", lastLatitude);
}
function sendlatlong(lastLongitude,lastLatitude) {
    if(userData){
        saveLocationSession(lastLongitude,lastLatitude);
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/' + userData.id + '/saveLocation'),
            data: {"lastLongitude": lastLongitude, "lastLatitude": lastLatitude},
            success: function (msg) {
                if (msg.success) {
                }
            }
        });
    }
}
function showAvailableLocationMessage(lastLongitude,lastLatitude,language){
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_users/locationAvailable'),
        data: {"lastLongitude": lastLongitude, "lastLatitude": lastLatitude,"lang":language},
        success: function (msg) {
            if(msg.message){
                if($("#errorAvailableLocationMessage").length==0){
                    $( ".page-cover" ).after('<div id="errorAvailableLocationMessage" style="margin-top: 10px;">'+msg.message+'</div>');
                }
            }

        }
    });

}
/*single parcel end code*/
 function onSuccess(position){
     var longitude = position.coords.longitude;
     var latitude = position.coords.latitude;
     showAvailableLocationMessage(longitude,latitude,selectedLang);
     sendlatlong(longitude,latitude);
     setInterval(function(){
         console.log('send location')
         sendlatlong(longitude,latitude)
     }, 100000);
     if($("#map").length>0){
         //console.log("succsess get location");

         var latLong = new google.maps.LatLng(latitude, longitude);
         var mapOptions = {
             center: latLong,
             zoom: 15,
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             gestureHandling: 'greedy'
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
                $.ajax({
                    type: "GET",
                    url: makeURL('foreraa_orders/calculateCost'),
                    data:{"distance":distance},
                    success: function (msg) {
                        if(msg.success){
                            cost=msg.cost;
                            $("#costInput").val(cost);
                            $("#cost").html(cost+strings.currency_code);
                        }
                    }
                });
                /*cost=0;
                if(parseFloat(distance)<=3){
                    cost=3;
                }else{
                    cost=((parseFloat(distance)-3)*1)+3;
                }
                $("#costInput").val(cost);
                $("#cost").html(cost+strings.currency_code)*/
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
        $("#makeOrder").attr('disabled','disabled');
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders'),
            data:$("#order-form").serialize(),
            success: function (msg) {
                $("#makeOrder").removeAttr('disabled');
                getMessages(msg,"#response")
                if(msg.success){
                    $("#order-form")[0].reset();
                    setTimeout(function(){
                        window.location.href="service.html";
                    },4000)
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
        if($(element).attr("id")=='order_details'||$(element).attr("id")=='coupon'){
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
        },
        delivery_time : {
            required:true,
        },
        coupon:{
            //validateUserEmail:true,
            remote: {
                url: makeURL('foreraa_coupons/checkCouponsCode'),
                type: "POST",
                cache: false,
                //dataType: "json",
                data: {
                    coupon: function() { return $("#coupon").val(); },
                },
                dataFilter: function(data) {
                    data=$.parseJSON(data);
                    console.log(data);
                    console.log(data.success);
                    if(data.success==false){
                        console.log(data.message);
                        $.extend($.validator.messages,{remote:strings[data.message[0]]});
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        },
    },
    messages: {
    },
    submitHandler: function() {
        //alert('start');
        //$("#charge-btn").attr("disabled", true);
        $(".loader").show();
        $("#makeOrder").attr('disabled','disabled');
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders'),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                $("#makeOrder").removeAttr('disabled');
                getMessages(msg,"#response")
                if(msg.success){
                    $("#service-order-form").hide();

                    setTimeout(function(){
                        window.location.href="service.html";
                    },4000)
                }
                $(".loader").hide();
            }

        });
    }
});


var editProfileValidator = $("#edit-profile").validate({
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
        $($(element).data("element")).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        //console.log("unhighlight:");
        //console.log(element);
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
    },
    messages: {
    },
    submitHandler: function() {
        //alert('start');
        //$("#charge-btn").attr("disabled", true);
        $(".loader").show();
        $.ajax({
            type: "PUT",
            url: makeURL('foreraa_users/'+userData.id),
            data:$("#edit-profile").serialize(),
            success: function (msg) {
                getMessages(msg,"#response")
                if(msg.success){

                }
                $(".loader").hide();
            }

        });
    }
});

//single complaint
$(document).on('click','.single-complaint',function(e){
    e.preventDefault();
    complaint_id=$(this).data('id');
    user_id=userData.id;
    if(user_id){
        $(".loader").show();
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_complaints/'+complaint_id+'?user_id='+user_id),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                if(msg.success){
                    window.sessionStorage.setItem("complaintData",JSON.stringify(msg.result));
                    window.location.href='single-complaint.html';
                }

            }
        });
    }
});
//single order
$(document).on('click','.single-order',function(e){
    e.preventDefault();
    order_id=$(this).data('id');
    //var userData = window.sessionStorage.getItem("userData");
    //userData=JSON.parse(userData);
    user_id=userData.id;
    if(userData.type=='customer'){
        if(user_id){
            $(".loader").show();
            $.ajax({
                type: "GET",
                url: makeURL('foreraa_orders/'+order_id+'?user_id='+user_id),
                data:$("#service-order-form").serialize(),
                success: function (msg) {
                    if(msg.success){
                        window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                        window.location.href='single-order.html';
                    }

                }
            });
        }
    }else{
        $(".loader").show();
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_orders/'+order_id+'?delegate_id='+user_id),
            data:$("#service-order-form").serialize(),
            success: function (msg) {
                if(msg.success){
                    window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                    window.location.href='single-order.html';
                }

            }
        });
    }

});
//single delegate order
$(document).on('click','.single-delegate-order',function(e){
    e.preventDefault();
    order_id=$(this).data('id');
    //var userData = window.sessionStorage.getItem("userData");
    //userData=JSON.parse(userData);
    statues=$(this).data('statues')
    $(".loader").show();
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_orders/'+order_id+'?statues=new&delegate_id=null'),
        data:$("#service-order-form").serialize(),
        success: function (msg) {
            if(msg.success){
                window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                window.location.href='single-order.html';
            }

        }
    });
});

/*$(document).on('click','.cancelOrder',function(e){
    e.preventDefault();
    console.log('cancelOrder');
    el=$(this);
    order_id=$(this).data('id');
    user_id=userData.id;
    console.log(userData)
    if(user_id){
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/'+user_id+'/cancelOrder'),
            data:{"order_id":order_id},
            success: function (msg) {
                if(msg.success){
                    el.remove();
                }

            }
        });
    }
});*/
$(document).on('submit','#cancelOrderForm',function(e){
    e.preventDefault();
    if($("#cancelOrderForm #cancel_comment").length){
        $(".loader").show();
        user_id=userData.id;
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/'+user_id+'/cancelOrder'),
            data:$("#cancelOrderForm").serialize(),
            success: function (msg) {
                if(msg.success){
                    $("#showCancelForm").parent().remove();
                    $("#uploadInvoice").parent().remove();
                }
                $(".loader").hide();
            }
        });
    }
});

$(document).on('click','.single-delegate',function(e){
    e.preventDefault();
    delegate_id=$(this).data('id');
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_users/'+delegate_id+'?type=delegate'),
        data:$("#service-order-form").serialize(),
        success: function (msg) {
            if(msg.success){
                window.sessionStorage.setItem("delegateData",JSON.stringify(msg.result));
                window.location.href='single-delegate.html';
            }

        }
    });
});
$(document).on('click','.chat-now',function(e){
    e.preventDefault();
    order_id=$(this).attr('data-order-id');
    orderData=window.sessionStorage.getItem("orderData")
    if(orderData){
        orderData=JSON.parse(orderData);
        if(orderData.order_id==order_id){
            window.location.href="single-order-chats.html";
        }
    }
});
function getChatData(orderData,userData){
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_orders/'+orderData.order_id+'/chats'),
        success: function (msg) {
            console.log(msg);
            if(msg.success){
                html='';
                if(userData.type=='customer'){
                    html+='<li class="right clearfix "> <span class="chat-img1 pull-left"> <img src="img/logoo.png" alt="forera" class="img-circle"> </span> <div class="chat-body1 clearfix"><p>'+strings['customer_chat']+'</p>  </div> </li>';
                }
                if(userData.type=='delegate'){
                    html+='<li class="right clearfix "> <span class="chat-img1 pull-left"> <img src="img/logoo.png" alt="forera" class="img-circle"> </span> <div class="chat-body1 clearfix"><p>'+strings['delegate_chat']+'</p>  </div> </li>';
                }
                if(msg.result.length){
                    msg.result.forEach(function (item) {
                        html+='<li class="left clearfix '+((userData.id==item.user_id)?'admin_chat':'')+'"> <span class="chat-img1 '+((userData.id==item.user_id)?'pull-right':'pull-left')+'"> <img src="'+item.image+'" alt="'+item.user_name+'" class="img-circle"> </span> <div class="chat-body1 clearfix"><p><!--<span class="username label '+((userData.id==item.user_id)?'label-info':'label-success')+'">'+item.user_name+'</span>--> '+item.message+'</p> <div class="chat_time '+((userData.id==item.user_id)?'pull-left':'pull-right')+'">'+formatDate(new Date(item.add_date))+' '+formatTime(new Date(item.add_date))+'</div> </div> </li>';
                    });
                }else{
                    //html='<div id="noData" class="text-center">No Messages</div>';
                    html+='<li id="noMessageDiv" class="left clearfix"><div class="chat-body1 clearfix" style="margin: 0;"><p class="text-center">No Message</p></div></li>';
                }
                console.log(html);
                $(".chat_area ul.list-unstyled").html(html);
                //$('.chat_area').scrollTop($('.chat_area')[0].scrollHeight);
            }
        }
    });
}
$(document).on('click','#sendChatMessage',function(e){
   /* if (typeof Keyboard.shrinkView!='undefined') {
        console.log('show keypoard')
        Keyboard.show();
    }*/


    e.preventDefault();
    var userData = window.sessionStorage.getItem("userData");
    userData=JSON.parse(userData);
    order_id=$("#chatOrderID").val();
    user_id=userData.id;
    message=$("#chatMessage").val();
    if(message.length){
        $("#sendChatMessage").attr('disabled','disabled');
        $(".message_write").removeClass('has-error');
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_orders/'+order_id+'/addChat'),
            data:{"user_id":user_id,"order_id":order_id,"message":message},
            success: function (msg) {
                if(msg.success){
                  $("#noMessageDiv").remove();
                  $("#chatMessage").val('')
                  $(".chat_area ul.list-unstyled").append('<li class="left clearfix admin_chat"> <span class="chat-img1 pull-right"> <img src="'+userData.image+'" alt="'+userData.name+'" class="img-circle"> </span> <div class="chat-body1 clearfix"> <p>'+message+'</p> <div class="chat_time pull-left">'+formatDate(new Date())+' '+formatTime(new Date())+'</div> </div> </li>');
                  $("#sendChatMessage").removeAttr('disabled');
                }
            }
        });
    }else{
        $(".message_write").addClass('has-error');
    }
});
//
$(document).on('click','#takePhoto',function(e){
    e.preventDefault();
    navigator.camera.getPicture(onSuccessPhoto, onFailPhoto, { quality: 20,
        destinationType: Camera.DestinationType.FILE_URL
    });
});
$(document).on('click','#selectPhoto',function(e){
    e.preventDefault();
    navigator.camera.getPicture(onSuccessPhoto, onFailPhoto, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});

function onSuccessPhoto(imageURI) {
    $(".loader").show();
    var options = new FileUploadOptions();
    options.fileKey = "image";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    ft.upload(imageURI, APIURL+"foreraa_orders/uploadOrderImage", function(result){
        console.log('successfully uploaded ' + result.response);
        responseData=JSON.parse(result.response);
        console.log(responseData.success);
        if(responseData.success){
            $("#imagesIDS").append('<input type="hidden" name="imageIDS[]" value="'+responseData.image_id+'">');
            imagesNumbers=$("#imagesIDS [name='imageIDS[]']").length;
            $("#imagesSelected").html(imagesNumbers+strings['images_selected'])
            $(".loader").hide();
        }
    }, function(error){
        console.log('error : ' + JSON.stringify(error));
    }, options);
}
function onFailPhoto(message) {
    alert('Failed because: ' + message);
}
$(document).on('click','#uploadInvoiceCamera',function(e){
    e.preventDefault();
    el=$(this);
    order_id=el.data('id');
    delegate_id=el.attr('data-delegate-id');
    navigator.camera.getPicture(function(imageURI){
            $(".loader").show();
            var options = new FileUploadOptions();
            options.fileKey = "image";
            options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
            options.mimeType = "image/jpeg";
            var params = {};
            params.order_id = order_id;
            params.delegate_id = delegate_id;
            options.params = params;
            options.chunkedMode = false;
            var ft = new FileTransfer();
            ft.upload(imageURI, APIURL+"foreraa_orders/uploadInvoice", function(result){
                console.log('successfully uploaded ' + result.response);
                responseData=JSON.parse(result.response);
                console.log(responseData.success);
                if(responseData.success){
                    $("#uploadInvoiceDiv").remove();
                    $(".loader").hide();
                    reloadSingleOrder();
                }
            }, function(error){
                console.log('error : ' + JSON.stringify(error));
            }, options);
    }, function(error){
        console.log('error : ' + JSON.stringify(error));
    }, { quality: 20,
        destinationType: Camera.DestinationType.FILE_URL
    });
});
$(document).on('click','#uploadInvoiceGallery',function(e){
    e.preventDefault();
    el=$(this);
    order_id=el.data('id');
    delegate_id=el.attr('data-delegate-id');
    navigator.camera.getPicture(function(imageURI){
        $(".loader").show();
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var params = {};
        params.order_id = order_id;
        params.delegate_id = delegate_id;
        options.params = params;
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, APIURL+"foreraa_orders/uploadInvoice", function(result){
            console.log('successfully uploaded ' + result.response);
            responseData=JSON.parse(result.response);
            console.log(responseData.success);
            if(responseData.success){
                $("#uploadInvoiceDiv").remove();
                $(".loader").hide();
                reloadSingleOrder();
            }
        }, function(error){
            console.log('error : ' + JSON.stringify(error));
        }, options);
    }, onFailPhoto, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});
$(document).on('click','#profileImageInput',function(e){
    e.preventDefault();
    navigator.camera.getPicture(function(imageURI){
        $(".loader").show();
        var options = new FileUploadOptions();
        options.fileKey = "image";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var params = {};
        params.user_id = userData.id;
        options.params = params;
        options.chunkedMode = false;
        var ft = new FileTransfer();
        ft.upload(imageURI, APIURL+"foreraa_users/"+userData.id+"/changeProfileImage", function(result){
            console.log('successfully uploaded ' + result.response);
            responseData=JSON.parse(result.response);
            console.log(responseData.success);
            if(responseData.success){
                $(".loader").hide();
                $("#userImageData").attr('src',responseData.result.image);
                window.sessionStorage.setItem("userData", JSON.stringify(responseData.result));
            }
        }, function(error){
            console.log('error : ' + JSON.stringify(error));
        }, options);
    }, onFailPhoto, { quality: 50,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        destinationType: Camera.DestinationType.FILE_URI
    });
});
$(document).on('click','#makeOffline',function(e){
    e.preventDefault();
    $(this).addClass('hidden')
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_users/'+userData.id+'/changeStatues'),
        data:{"status":'offline'},
        success: function (msg) {
            if(msg.success){
                $("#makeOnline").removeClass('hidden');
                $("#delegateStatues").removeClass('online offline').addClass('offline')
                userData.delegateData.status='offline';
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }
        }
    });
});
$(document).on('click','#makeOnline',function(e){
    e.preventDefault();
    $(this).addClass('hidden')
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_users/'+userData.id+'/changeStatues'),
        data:{"status":'online'},
        success: function (msg) {
            if(msg.success){
                $("#makeOffline").removeClass('hidden');
                $("#delegateStatues").removeClass('online offline').addClass('online')
                userData.delegateData.status='online';
                window.sessionStorage.setItem("userData", JSON.stringify(userData));
            }
        }
    });
});

$(document).on('click','#showInvoiceButton',function(e){
    e.preventDefault();
    $(this).html((($(this).html()==strings['show_invoice'])?strings['hide_invoice']:strings['show_invoice']))
    $('#invoiceImage').toggle();
});
$(document).on('click','#showCancelForm',function(e){
    e.preventDefault();
    $(this).html((($(this).html()==strings['show_cancel_form'])?strings['hide_cancel_form']:strings['show_cancel_form']))
    $('#cancelOrderDiv').toggle();
});

$(document).on('click','.confirmOrder',function(e){
    e.preventDefault();
    console.log('confirmOrder');
    el=$(this);
    order_id=$(this).data('id');
    user_id=userData.id;
    if(user_id){
        $.ajax({
            type: "POST",
            url: makeURL('foreraa_users/'+user_id+'/confirmOrder'),
            data:{"order_id":order_id},
            success: function (msg) {
                if(msg.success){
                    el.remove();
                    reloadSingleOrder();
                }else{
                    getMessages(msg,"#response")
                }

            }
        });
    }
});
$(document).on('click','#confirmInvoice',function(e){
    e.preventDefault();
    el=$(this);
    order_id=el.data('id');
    customer_id=el.attr('data-customer-id');
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_orders/confirmInvoice'),
        data:{"order_id":order_id,"customer_id":customer_id},
        success: function (msg) {
            if(msg.success){
               el.remove();
               reloadSingleOrder();
            }
        }
    });
});
$(document).on('click','#makeClosed',function(e){
    e.preventDefault();
    el=$(this);
    order_id=el.data('id');
    delegate_id=el.attr('data-delegate-id');
    $.ajax({
        type: "POST",
        url: makeURL('foreraa_orders/makeClosed'),
        data:{"order_id":order_id,"delegate_id":delegate_id},
        success: function (msg) {
            if(msg.success){
                el.remove();
                reloadSingleOrder();
            }
        }
    });
});
//login page
$(document).on('change','input[name="type"]',function(e){
    val=$(this).val();
    $(".type-icon").removeClass('fa-arrow-right');
    $("#label-"+val+" .type-icon").addClass('fa-arrow-right')
});
$(document).on('click','#makInviteFriend',function(e){
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: makeURL('appSettings'),
        success: function (msg) {
            if(msg.success){
                resultData=msg.result;
                message=(resultData.invite_friend_message)?resultData.invite_friend_message:null
                subject=(resultData.invite_friend_subject)?resultData.invite_friend_subject:null
                image=(resultData.invite_friend_image)?resultData.invite_friend_image:null
                link=(resultData.invite_friend_android_link)?resultData.invite_friend_android_link:null
                window.plugins.socialsharing.share(message, subject, image, link)
            }
        }
    });

});
function encodeImageUri(imageData) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function() {
        c.width = this.width;
        c.height = this.height;
        ctx.drawImage(img, 0, 0);
    };
    img.src = imageData;
    var dataURL = c.toDataURL("image/jpeg");
    console.log(dataURL);
    return dataURL;
}

$(document).on('click','.order-image',function(e){
    imageSrc=$(this).attr('src');
    title=$(this).attr('data-title');
    PhotoViewer.show(imageSrc, title);
/*
    //FullScreenImage.showImageBase64(encodeImageUri(imageSrc));
    FullScreenImage.showImageBase64('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCACWASwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k=','img.jpg');*/
})

