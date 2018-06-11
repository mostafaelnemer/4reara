var complaintData = window.sessionStorage.getItem("complaintData");
var userData = window.sessionStorage.getItem("userData");
console.log(complaintData);
if(complaintData){
    complaintData=JSON.parse(complaintData);
    userData=JSON.parse(userData);
    $("#complaint-title").html('Complaint Number #'+complaintData.id);
    $("#complaint-details").html(complaintData.complaint);
}else{
    window.location.href="my-orders.html"
}