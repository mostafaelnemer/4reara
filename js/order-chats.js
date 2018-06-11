var orderData = window.sessionStorage.getItem("orderData");
var userData = window.sessionStorage.getItem("userData");
if(orderData){
    orderData=JSON.parse(orderData);
    userData=JSON.parse(userData);
    $("#order-title").html('Order Number #'+orderData.id);
    $("#chatOrderID").val(orderData.id);
    $("#chatUserID").val(userData.id);
    getChatData(orderData,userData);
    setInterval(function(){getChatData(orderData,userData)},10000);
}