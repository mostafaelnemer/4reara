var view= strings.view;
var no_delegate= strings.no_delegate;
var save= strings.save;
//var orderData = window.sessionStorage.getItem("orderData");/
//var userData = window.sessionStorage.getItem("userData");
var orderData = window.sessionStorage.getItem("orderData");
var userData = window.sessionStorage.getItem("userData");

$(document).ready(function(){
    if(orderData){
        orderData=JSON.parse(orderData);
        userData=JSON.parse(userData);
        $("#order-title").html('Order Number #'+orderData.id);
        $("#order_place_of_delivery").removeAttr('trans-lang-html').html('<span class="pull-right"><i class="fa fa-map-marker"></i></span> '+orderData.place_of_delivery_address);
        $("#order_delivery_place").removeAttr('trans-lang-html').html('<span class="pull-right"><i class="fa fa-map-marker"></i></span> '+orderData.delivery_place_address);
        $("#order_details").val(orderData.details)
        $("#distance").html(orderData.distance)
        $("#duration").html(orderData.duration)
        $("#cost").html(orderData.cost);

        delegateHtml='';
        delegateHtml+='<div class="clearfix"></div>';
        delegateHtml+='<div class="clearfix"></div>';
        console.log(orderData.statues);
        console.log(userData);
        if(userData.type=='customer'){
            if(orderData.delegate_id){
                delegateHtml+='<div class="hr-border"></div><div class="clearfix"></div><div class="delegate-section"><div class="col-xs-3"><a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'"><img style="width: 100%" src="'+((orderData.delegate_img_dir&&orderData.delegate_img)?SITEURL+orderData.delegate_img_dir+orderData.delegate_img:SITEURL+'img/Users/default_image.png')+'" class="img-circle" alt=""></a></div> <div class="col-xs-9"><a href="#" data-order-id="'+orderData.id+'" class="pull-right chat-now"><i class="fa fa-commenting"></i></a><a class="pull-right call-now" href="tel:'+orderData.delegate_phone+'"><i class="fa fa-phone"></i></a> <a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'"><h4>'+orderData.delegate_name+'</h4></a> <ul class="list-unstyled list-inline star-rating"> ';
                for(x=1;x<=orderData.delegate_rating;x++){
                    delegateHtml+='<li><span><i class="fa fa-star"></i></span></li>';
                }
                for(y=x;y<=5;y++){
                    delegateHtml+='<li><span><i class="fa fa-star-o"></i></span></li>';
                }
                delegateHtml+='</ul> <a href="#" class="single-delegate" data-id="'+orderData.delegate_id+'">'+view+'</a> </div><div class="clearfix"></div></div>';
            }else{
                delegateHtml='<div class="clearfix"></div><div class="alert alert-info"><i class="fa fa-times-circle"></i> No Delegate</div>';
            }
            if(orderData.has_rating==0&&orderData.statues=='closed'){
                delegateHtml+='<div class="clearfix"></div><div class="clearfix" style="height: 10px;"></div><div class="col-md-12"><form id="ratingForm" action="" method="post"><div id="ratingForm-response"></div> <input type="hidden" name="user_id" value="'+userData.id+'"> <input type="hidden" name="delegate_id" value="'+orderData.delegate_id+'"> <input type="hidden" id="order_id" name="order_id" value="'+orderData.id+'"> <input id="ratings-hidden" name="rating" type="hidden"> <div class="form-group"><textarea class="form-control animated" cols="50" id="new-review" name="comment" placeholder="Enter your review here..." rows="5"></textarea></div>  <div class="text-right"> <div class="stars starrr" data-rating="0"></div> <button class="btn btn-success btn-lg" type="submit">Save</button></div></form></div>';
            }
            if((userData.id==orderData.user_id||(orderData.delegate_id&&orderData.delegate_id==userData.id))&&$.inArray(orderData.statues,['cancel'])!=-1){
                delegateHtml+='<div class="col-lg-12"><button class="cancelOrder btn btn-info btn-block" data-id="'+orderData.id+'">'+strings['cancel']+'</button></div>'
            }
        }else{

            delegateHtml+='<div class="hr-border"></div><div class="clearfix"></div><div class="customer-section"><div class="col-xs-3"><img style="width: 100%" src="'+((orderData.user_img_dir&&orderData.user_img)?SITEURL+orderData.user_img_dir+orderData.user_img:SITEURL+'img/Users/default_image.png')+'" class="img-circle" alt=""></div>';
            delegateHtml+='<div class="col-xs-9"><a href="#" data-order-id="'+orderData.id+'" class="pull-right chat-now"><i class="fa fa-commenting"></i></a><a class="pull-right call-now" href="tel:'+orderData.user_phone+'"><i class="fa fa-phone"></i></a> <h4>'+orderData.user_name+'</h4></div><div class="clearfix"></div></div>';
            if(orderData.statues=='new'){
                delegateHtml+='<div class="col-lg-12"><button class="confirmOrder btn btn-info btn-block" data-id="'+orderData.id+'">'+strings['confirm']+'</button></div>'
            }
            if(orderData.statues=='inprogress'){
                delegateHtml+='<div class="col-lg-12"><button id="uploadInvoice" class=" btn btn-info btn-block" data-delegate-id="'+userData.id+'" data-id="'+orderData.id+'">'+strings['create_invoice']+'</button></div>'
            }
        }


        delegateHtml+='<div class="clearfix"></div>';
        delegateHtml+='<div class="clearfix"></div>';
        $("#delegate-content").html(delegateHtml);
        if(orderData.has_rating==0&&orderData.statues=='closed'){
            var ratingForm = $("#ratingForm").validate({
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
                    $("#ratingForm-response").html('');
                    if($("#ratings-hidden").val()){
                        $.ajax({
                            type: "POST",
                            url: makeURL('foreraa_users/'+orderData.delegate_id+'/rating'),
                            data:$("#ratingForm").serialize(),
                            success: function (msg) {
                                getMessages(msg,"#ratingForm-response")
                                if(msg.success){
                                    $("#ratingForm")[0].reset();
                                }
                            }
                        });
                    }else{
                        $("#ratingForm-response").html('<div class="alert alert-danger">Please Select Rating At Less One Star</div>')
                    }
                    $(".loader").hide();

                }
            });
        }
        function initMap() {
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var map = new google.maps.Map(document.getElementById('order-map'), {
                zoom: 6,
                center: {lat: Number(orderData.place_of_delivery_latitude), lng: Number(orderData.place_of_delivery_longitude)},
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                gestureHandling: 'greedy'
            });
            directionsDisplay.setMap(map);
            //directionsDisplay.setPanel(document.getElementById('right-panel'));
            calculateAndDisplayRoute(directionsService, directionsDisplay);
        }

        function calculateAndDisplayRoute(directionsService, directionsDisplay) {
            /* var waypts = [];
             var checkboxArray = document.getElementById('waypoints');
             for (var i = 0; i < checkboxArray.length; i++) {
                 if (checkboxArray.options[i].selected) {
                     waypts.push({
                         location: checkboxArray[i].value,
                         stopover: true
                     });
                 }
             }*/
            /* var geocoder = new google.maps.Geocoder();
             var latlng = {lat: lastLatitude, lng: lastLongitude};
             geocoder.geocode({'location': latlng}, function(results, status) {
                 if (status === google.maps.GeocoderStatus.OK) {
                     address=results[0].formatted_address;
                     console.log(address);
                 }else {
                     alert('Geocode was not successful for the following reason: ' + status);
                 }
             });*/
            directionsService.route({
                origin: orderData.place_of_delivery_address,
                destination: orderData.delivery_place_address,
                waypoints: [],
                optimizeWaypoints: true,
                travelMode: 'DRIVING',
            }, function(response, status) {
                console.log(orderData.place_of_delivery_address," - ",orderData.delivery_place_address);
                if (status === 'OK') {

                    directionsDisplay.setDirections(response);
                    var route = response.routes[0];
                    console.log(route);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
        initMap();
    }else{
        window.location.href="my-orders.html"
    }
});
