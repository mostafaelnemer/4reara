var userData=window.sessionStorage.getItem('userData');
if(userData){
    userData=JSON.parse(userData);
    user_id=userData.id;
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_orders?user_id='+user_id),
        success: function (msg) {
            //getMessages(msg,"#response")
            $(".loader").hide();
            if(msg.success){
                html="";
                msg.result.forEach(function(item){
                    html+='<li class="list-group-item"><a href="javascript:void(0)"> <div class="col-xs-3 col-sm-3"> <img src="img/order-icon.png" alt="Order Number #'+item.id+'" class="img-responsive img-circle" /> </div> <div class="col-xs-9 col-sm-9"> <span class="name">Order Number #'+item.id+'</span> <div class="clearfix"></div> <span class="visible-xs"> <span class="text-muted">'+item.place_of_delivery_address+'</span></span> <div class="clearfix"></div><span class="visible-xs"> <span class="text-muted">'+item.distance+' - '+item.duration+'</span></span>  </div> <div class="clearfix"></div> </a></li>';
                });
                $("#services-list").html(html)
            }
        }

    });
}
console.log('sss');
console.log(userData);



