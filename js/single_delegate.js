var userData = window.sessionStorage.getItem("userData");
var delegateData = window.sessionStorage.getItem("delegateData");
if(delegateData){
    delegateData=JSON.parse(delegateData);
    userData=JSON.parse(userData);
    delegateRatingHtml='<ul class="list-unstyled list-inline star-rating">';
    for(x=1;x<=delegateData.rating;x++){
        delegateRatingHtml+='<li><span><i class="fa fa-star"></i></span></li>';
    }
    for(y=x;y<=5;y++){
        delegateRatingHtml+='<li><span><i class="fa fa-star-o"></i></span></li>';
    }
    delegateRatingHtml+='</ul>'
    $("#delegateRating").html(delegateRatingHtml);
    $("#delegateImage").attr('src',delegateData.image);
    $("#delegateTitleName,#delegateName").html(delegateData.name);
    $("#delegatePhone").html(delegateData.phone);
    $("#delegateOrders").html(delegateData.orders);
}