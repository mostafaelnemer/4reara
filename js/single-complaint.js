var complaintData = window.sessionStorage.getItem("complaintData");
var userData = window.sessionStorage.getItem("userData");
console.log(complaintData);
if(complaintData){
    complaintData=JSON.parse(complaintData);
    userData=JSON.parse(userData);
    complaint_id=complaintData.id;
    user_id=userData.id;
    $("#complaint-title").html('Complaint Number #'+complaintData.id);
    $("#complaint-details").html(complaintData.complaint);
    PullToRefresh.init({
        mainElement: '.page-wrapper', // above which element?
        onRefresh: function (cb) {
            $(".loader").show();
            $.ajax({
                type: "GET",
                url: makeURL('foreraa_complaints/'+complaint_id+'?user_id='+user_id),
                success: function (msg) {
                    if(msg.success){
                        window.sessionStorage.setItem("complaintData",JSON.stringify(msg.result));
                        complaintData=msg.result;
                        $("#complaint-title").html('Complaint Number #'+complaintData.id);
                        $("#complaint-details").html(complaintData.complaint);
                        cb();
                    }
                }
            });
        }
    });
    /*window.document.addEventListener("scroll", function(){
        if(window.pageYOffset == 0){
            $(".loader").show();
            $.ajax({
                type: "GET",
                url: makeURL('foreraa_complaints/'+complaint_id+'?user_id='+user_id),
                success: function (msg) {
                    if(msg.success){
                        window.sessionStorage.setItem("complaintData",JSON.stringify(msg.result));
                        complaintData=msg.result;
                        $("#complaint-title").html('Complaint Number #'+complaintData.id);
                        $("#complaint-details").html(complaintData.complaint);
                        window.scrollBy(0, 60);
                    }

                }
            });


        }
    },false)*/
}else{
    window.location.href="my-orders.html"
}