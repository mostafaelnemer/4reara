

var userData = window.sessionStorage.getItem("userData")
if(userData){
    window.location.href='map.html'

}else{
    PullToRefresh.init({
        mainElement: '.page-wrapper', // above which element?
        onRefresh: function (cb) {
            setTimeout(function () {
                cb();
            }, 1500);
        }
    });
   /* window.document.addEventListener("scroll", function(){
        if(window.pageYOffset == 0){
            window.scrollBy(0, 60);
        }
    },false)*/
}