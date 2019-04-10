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

    PullToRefresh.init({
        mainElement: '.page-wrapper', // above which element?
        onRefresh: function (cb) {
            delegate_id=delegateData.id;
            $.ajax({
                type: "GET",
                url: makeURL('foreraa_users/'+delegate_id+'?type=delegate'),
                data:$("#service-order-form").serialize(),
                success: function (msg) {
                    if(msg.success){
                        window.sessionStorage.setItem("delegateData",JSON.stringify(msg.result));
                        delegateData=msg.result;
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
                        cb();
                    }
                }
            });

        }
    });
    /*window.document.addEventListener("scroll", function(){
        if(window.pageYOffset == 0){
            delegate_id=delegateData.id;
            $.ajax({
                type: "GET",
                url: makeURL('foreraa_users/'+delegate_id+'?type=delegate'),
                data:$("#service-order-form").serialize(),
                success: function (msg) {
                    if(msg.success){
                        window.sessionStorage.setItem("delegateData",JSON.stringify(msg.result));
                        delegateData=msg.result;
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
                        window.scrollBy(0, 60);
                    }
                }
            });
        }
    },false)*/
}