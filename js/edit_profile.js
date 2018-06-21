var userData = window.sessionStorage.getItem("userData");
if(userData){
    userData=JSON.parse(userData);
    $("#userNameData").val(userData.name);
    $("#userImageData").attr('src',userData.image);
    $("#userEmailData").val(userData.email);
    $("#userPhoneData").val(userData.phone);
}