order_id=get('order_id');
if(order_id){
    $(".loader").show();
    $.ajax({
        type: "GET",
        url: makeURL('foreraa_orders/'+order_id),
        success: function (msg) {
            if(msg.success){
                window.sessionStorage.setItem("orderData",JSON.stringify(msg.result));
                window.location.href='single-order-chats.html';
            }

        }
    });
}

var orderData = window.sessionStorage.getItem("orderData");
var userData = window.sessionStorage.getItem("userData");
if(orderData){
    orderData=JSON.parse(orderData);
    userData=JSON.parse(userData);
    $("#order-title").html('Order Number #'+orderData.order_id);
    $("#chatOrderID").val(orderData.order_id);
    $("#chatUserID").val(userData.id);
    getChatData(orderData,userData);
    setInterval(function(){getChatData(orderData,userData)},10000);
    PullToRefresh.init({
        mainElement: '.page-wrapper', // above which element?
        onRefresh: function (cb) {
            setTimeout(function () {
                cb();
            }, 1500);
        }
    });
    /*window.document.addEventListener("scroll", function(){
        if(window.pageYOffset == 0){
            window.scrollBy(0, 60);

        }
    },false)*/
}