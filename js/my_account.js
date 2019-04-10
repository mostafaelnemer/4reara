/**
 * Created by Naira.Magdy on 6/21/2018.
 */

var userData = window.sessionStorage.getItem("userData");
if(userData){
    userData=JSON.parse(userData);
    $("#my_account").html(' <div id="user-profile-img"><img src="'+userData.image+'" class="img-responsive img-circle" alt="user-img" /></div> <div class="innerpage-heading user-profile-heading"> <h3>'+userData.name+'</h3> <hr/> </div><!-- end innerpage-heading --> <div class="edit-link text-right"> <a href="edit-profile.html"><span><i class="fa fa-pencil-alt"></i></span>'+strings['edit_profile']+'</a> </div><!-- end edit-link --> <div class="table-responsive text-left"><table class="table table-hover table-striped"> <tbody> <tr> <td>'+strings['name']+'</td><td>'+userData.name+'</td> </tr> <tr> <td>'+strings['email']+'</td> <td>'+userData.email+'</td> </tr> <tr> <td>'+strings['phone']+'</td> <td>'+userData.phone+'</td> </tr> <tr> <td>'+strings.facebook_link+'</td> <td>'+((userData.facebook_link==null)?'':userData.facebook_link)+'</td><tr> <td>'+strings.google_link+'</td> <td>'+((userData.google_link==null)?'':userData.google_link)+'</td> </tr><tr> <td>'+strings.instagram_link+'</td> <td>'+((userData.instagram_link==null)?'':userData.instagram_link)+'</td> </tr><tr> <td>'+strings.linkedin_link+'</td> <td>'+((userData.linkedin_link==null)?'':userData.linkedin_link)+'</td> </tr><tr> <td>'+strings.twitter_link+'</td> <td>'+((userData.twitter_link==null)?'':userData.twitter_link)+'</td> </tr><tr> <td>'+strings.youtube_link+'</td> <td>'+((userData.youtube_link==null)?'':userData.youtube_link)+'</td> </tr><tr> <td>'+strings.balance+'</td> <td>'+((userData.balance==null)?'':userData.balance)+'</td> </tr> </tbody> </table> </div><!-- end table-responsive -->');
    PullToRefresh.init({
        mainElement: '.page-wrapper', // above which element?
        onRefresh: function (cb) {
            cb();
            var db = window.openDatabase("foreraa_app.db", "1.0", "Foreraa App", 200000);
            db.transaction(function(tx){
                query='SELECT * FROM foreraa_app_user WHERE id=?';
                tx.executeSql(query,[1],function(tx, res){
                    if(res.rows.length){
                        userDataDB=res.rows[0]
                        console.log(userDataDB);
                        $.ajax({
                            type: "POST",
                            url: makeURL('foreraa_users/login'),
                            data: {"phone":userDataDB.username,"password":userDataDB.password},
                            success: function (msg) {
                                $(".loader").hide();
                                if(msg.success){
                                    window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                                    userData=msg.result;
                                    $("#my_account").html(' <div id="user-profile-img"><img src="'+userData.image+'" class="img-responsive img-circle" alt="user-img" /></div> <div class="innerpage-heading user-profile-heading"> <h3>'+userData.name+'</h3> <hr/> </div><!-- end innerpage-heading --> <div class="edit-link text-right"> <a href="edit-profile.html"><span><i class="fa fa-pencil-alt"></i></span>'+strings['edit_profile']+'</a> </div><!-- end edit-link --> <div class="table-responsive text-left"><table class="table table-hover table-striped"> <tbody> <tr> <td>'+strings['name']+'</td><td>'+userData.name+'</td> </tr> <tr> <td>'+strings['email']+'</td> <td>'+userData.email+'</td> </tr> <tr> <td>'+strings['phone']+'</td> <td>'+userData.phone+'</td> </tr> <tr> <td>'+strings.facebook_link+'</td> <td>'+((userData.facebook_link==null)?'':userData.facebook_link)+'</td><tr> <td>'+strings.google_link+'</td> <td>'+((userData.google_link==null)?'':userData.google_link)+'</td> </tr><tr> <td>'+strings.instagram_link+'</td> <td>'+((userData.instagram_link==null)?'':userData.instagram_link)+'</td> </tr><tr> <td>'+strings.linkedin_link+'</td> <td>'+((userData.linkedin_link==null)?'':userData.linkedin_link)+'</td> </tr><tr> <td>'+strings.twitter_link+'</td> <td>'+((userData.twitter_link==null)?'':userData.twitter_link)+'</td> </tr><tr> <td>'+strings.youtube_link+'</td> <td>'+((userData.youtube_link==null)?'':userData.youtube_link)+'</td> </tr><tr> <td>'+strings.balance+'</td> <td>'+((userData.balance==null)?'':userData.balance)+'</td> </tr> </tbody> </table> </div><!-- end table-responsive -->');
                                }
                            }

                        });


                    }

                });
            },errorDB,successDB);
        }
    });

    /*window.document.addEventListener("scroll", function(){
        if(window.pageYOffset == 0){
            window.scrollBy(0, 60);
            var db = window.openDatabase("foreraa_app.db", "1.0", "Foreraa App", 200000);
            db.transaction(function(tx){
                query='SELECT * FROM foreraa_app_user WHERE id=?';
                tx.executeSql(query,[1],function(tx, res){
                    if(res.rows.length){
                        userDataDB=res.rows[0]
                        console.log(userDataDB);
                        $.ajax({
                            type: "POST",
                            url: makeURL('foreraa_users/login'),
                            data: {"phone":userDataDB.username,"password":userDataDB.password},
                            success: function (msg) {
                                $(".loader").hide();
                                if(msg.success){
                                    window.sessionStorage.setItem("userData", JSON.stringify(msg.result));
                                    userData=msg.result;
                                    $("#my_account").html(' <div id="user-profile-img"><img src="'+userData.image+'" class="img-responsive img-circle" alt="user-img" /></div> <div class="innerpage-heading user-profile-heading"> <h3>'+userData.name+'</h3> <hr/> </div><!-- end innerpage-heading --> <div class="edit-link text-right"> <a href="edit-profile.html"><span><i class="fa fa-pencil-alt"></i></span>'+strings['edit_profile']+'</a> </div><!-- end edit-link --> <div class="table-responsive text-left"><table class="table table-hover table-striped"> <tbody> <tr> <td>'+strings['name']+'</td><td>'+userData.name+'</td> </tr> <tr> <td>'+strings['email']+'</td> <td>'+userData.email+'</td> </tr> <tr> <td>'+strings['phone']+'</td> <td>'+userData.phone+'</td> </tr> <tr> <td>'+strings.facebook_link+'</td> <td>'+((userData.facebook_link==null)?'':userData.facebook_link)+'</td><tr> <td>'+strings.google_link+'</td> <td>'+((userData.google_link==null)?'':userData.google_link)+'</td> </tr><tr> <td>'+strings.instagram_link+'</td> <td>'+((userData.instagram_link==null)?'':userData.instagram_link)+'</td> </tr><tr> <td>'+strings.linkedin_link+'</td> <td>'+((userData.linkedin_link==null)?'':userData.linkedin_link)+'</td> </tr><tr> <td>'+strings.twitter_link+'</td> <td>'+((userData.twitter_link==null)?'':userData.twitter_link)+'</td> </tr><tr> <td>'+strings.youtube_link+'</td> <td>'+((userData.youtube_link==null)?'':userData.youtube_link)+'</td> </tr><tr> <td>'+strings.balance+'</td> <td>'+((userData.balance==null)?'':userData.balance)+'</td> </tr> </tbody> </table> </div><!-- end table-responsive -->');
                                }
                            }

                        });


                    }

                });
            },errorDB,successDB);
        }
    },false)*/

}
