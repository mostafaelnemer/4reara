/**
 * Created by Naira.Magdy on 6/21/2018.
 */
var userData=window.sessionStorage.getItem('userData');
if(userData){
    userData=JSON.parse(userData);
    user_id=userData.id;
    if(userData.type=='customer'){
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_users/'+user_id+'/getAllRatings'),
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                if(msg.success){

                    html="";

                    if(msg.result.length){
                        msg.result.forEach(function(item){
                            const starTotal = 5;


                                const starPercentage = (item.rating / starTotal) * 100;
                                const starPercentageRounded = Math.round(starPercentage / 10) * 10 + "%";


                            // document.querySelector("." + item.rating  + " .stars-inner").style.width = starPercentageRounded;

                            console.log(item)
                            //html+='<li class="list-group-item"><a href="javascript:void(0)" data-id="'+item.order_id+'" class="single-order"> <div class="col-xs-3 col-sm-3"> <img src="img/order-icon.png" alt="Order Number #'+item.id+'" class="img-responsive img-circle" /> </div> <div class="col-xs-9 col-sm-9"> <span class="name">Order Number #'+item.id+'</span> <div class="clearfix"></div> <span class="visible-xs"> <span class="text-muted">'+item.place_of_delivery_address+'</span></span> <div class="clearfix"></div><span class="visible-xs"> <span class="text-muted">'+item.distance+' - '+item.duration+'</span></span>  </div> <div class="clearfix"></div> </a></li>';
                            add_date=new Date(item.add_date);

                            html+='<a href="javascript:void(0)"><div class="panel panel-default order-panel"> <div class="panel-heading"> <div class="order-title"> <div class="order-name pull-left"> <h3 class="panel-title"><span>'+item.delegate_name+'</span> </h3> <ul class="list-inline"> <li><i class="fa fa-calendar-alt"></i>'+item.comment+'</li>  </ul> </div> <span class="order-status1 success pull-right"><div class="stars-outer"> <div class="stars-inner" style="width: '+starPercentageRounded+'"></div></div></span> </div> </div><!-- end panel-heading --> </div></a>'

                        });
                    }else{
                        html+='<div class="panel panel-default order-panel"> <div class="panel-heading"> <div class="order-title"> <div class="order-name"> <h3 class="panel-title text-center"><span>'+no_order+'</h3>  </div>  </div> </div><!-- end panel-heading --> </div>'
                    }

                    $("#delegate_ratings").html(html)
                }
            }

        });
    }else{
        window.location.href="./";
    }

}