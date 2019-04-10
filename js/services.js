var servicesData = window.sessionStorage.getItem("servicesData");
console.log(servicesData);
if(servicesData){
    //$(".loader").show();
    servicesData=JSON.parse(servicesData);
    html="";
    servicesData.forEach(function(item){
        html+='<li><a href="javascript:void(0)" style="background: '+item.color+';" data-id="'+item.id+'" data-json=\''+JSON.stringify(item)+'\' class="single-service">' +
            //'<span><i class="fullscr-nav-icon fas '+item.icon+'"></i></span>'+
            '<div class="text-center"><img src="'+item.image+'" style="width:30px;"></div>'+
            item.name+'</a><span class="border-shape"></span></li>';
    });
    $(".fullscr-navigation.position-initial ul.list-unstyled").html(html);

}
console.log($( window ).width());
PullToRefresh.init({
    mainElement: '.page-wrapper', // above which element?
    onRefresh: function (cb) {
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_services?Lang='+selectedLang),
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                if(msg.success){
                    window.sessionStorage.setItem("servicesData", JSON.stringify(msg.result));
                    servicesData=msg.result;
                    html="";
                    servicesData.forEach(function(item){
                        html+='<li><a href="javascript:void(0)" style="background: '+item.color+';" data-id="'+item.id+'" data-json=\''+JSON.stringify(item)+'\' class="single-service">' +
                            //'<span><i class="fullscr-nav-icon fas '+item.icon+'"></i></span>'+
                            '<div class="text-center"><img src="'+item.image+'" style="width:30px;"></div>'+
                            item.name+'</a><span class="border-shape"></span></li>';
                    });
                    $(".fullscr-navigation.position-initial ul.list-unstyled").html(html);
                    cb();
                }
            }

        });

    }
});
/*
window.document.addEventListener("scroll", function(){
    if(window.pageYOffset == 0){
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_services?Lang='+selectedLang),
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                if(msg.success){
                    window.sessionStorage.setItem("servicesData", JSON.stringify(msg.result));
                    servicesData=msg.result;
                    html="";
                    servicesData.forEach(function(item){
                        html+='<li><a href="javascript:void(0)" style="background: '+item.color+';" data-id="'+item.id+'" data-json=\''+JSON.stringify(item)+'\' class="single-service">' +
                            //'<span><i class="fullscr-nav-icon fas '+item.icon+'"></i></span>'+
                            '<div class="text-center"><img src="'+item.image+'" style="width:30px;"></div>'+
                            item.name+'</a><span class="border-shape"></span></li>';
                    });
                    $(".fullscr-navigation.position-initial ul.list-unstyled").html(html);
                    window.scrollBy(0, 60);
                }
            }

        });


    }
},false)*/
