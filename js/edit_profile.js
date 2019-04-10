var userData = window.sessionStorage.getItem("userData");
if(userData){
    userData=JSON.parse(userData);
    console.log(userData);
    $("#userNameData").val(userData.name);
    $("#userImageData").attr('src',userData.image);
    $("#userEmailData").val(userData.email);
    $("#userPhoneData").val(userData.phone);
    $("#userFacebookData").val(userData.facebook_link);
    $("#userGoogleData").val(userData.google_link);
    $("#userTwitterData").val(userData.twitter_link);
    $("#userLinkedinData").val(userData.linkedin_link);
    $("#userInstagramData").val(userData.instagram_link);
    $("#userYoutubeData").val(userData.youtube_link);
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