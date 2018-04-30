var serviceData = window.sessionStorage.getItem("serviceData");
console.log(serviceData);
//console.log(serviceData);
if(serviceData){
    console.log('session');

    serviceData=JSON.parse(serviceData);
    console.log(serviceData.type);
    if(serviceData.type=='parcel'){
        console.log('asasdasd');
        searchOnGoogleMap(serviceData);
    }else{
        //window.location.href="services.html";
    }
}else{
    console.log('notsession');
    id=get('id');
    if(id){
        $.ajax({
            type: "GET",
            url: makeURL('foreraa_services/'+id),
            success: function (msg) {
                //getMessages(msg,"#response")
                $(".loader").hide();
                if(msg.success){
                    if(msg.result.type=='parcel'){
                        window.sessionStorage.setItem("serviceData", JSON.stringify(msg.result));
                        searchOnGoogleMap(JSON.stringify(msg.result));
                    }else{
                        //window.location.href="services.html";
                    }
                }
            }

        });
    }

}
