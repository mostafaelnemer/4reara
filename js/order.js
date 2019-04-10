//var orderData = window.sessionStorage.getItem("orderData");/
//var userData = window.sessionStorage.getItem("userData");

var orderData = window.sessionStorage.getItem("orderData");
var userData = window.sessionStorage.getItem("userData");
userData=JSON.parse(userData);
order_id=get('id');
if(order_id){
    delegate_id=(userData.type=='delegate'&&!orderData)?'?delegate_id=null':'';
    $(".loader").show();
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_orders/'+order_id+delegate_id),
        data:(delegate_id)?$("#service-order-form").serialize():{},
        success: function (msg) {
            if(msg.success){
                window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                window.location.href='single-order.html';
            }else{
                window.location.href="my-orders.html"
            }

        }
    });
}else{
        if(orderData){
            orderData=JSON.parse(orderData);
            orderDataHTML(orderData,userData);


            initMap();

            PullToRefresh.init({
                mainElement: '.page-wrapper', // above which element?
                onRefresh: function (cb) {
                    user_id=userData.id;
                    order_id=orderData.order_id;
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
                                        cb();
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
                                    cb();
                                }

                            }
                        });
                    }
                }
            });
            /*window.document.addEventListener("scroll", function(){
                if(window.pageYOffset == 0){
                    window.scrollBy(0, 60);
                    user_id=userData.id;
                    order_id=orderData.order_id;
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
                                        window.scrollBy(0, 60);
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
                                    window.scrollBy(0, 60);
                                }

                            }
                        });
                    }

                }
            },false)*/
        }else{
            window.location.href="my-orders.html"
        }

}




