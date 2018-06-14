
console.log(localStorage.getItem("lang"));
  var imported = document.createElement('script');
 if(localStorage.getItem("lang")=="ar"){
   // alert(localStorage.getItem("lang"));
   console.log("middle ar");
    imported.src = 'lang/ar.js';
    document.head.appendChild(imported);

 }
 else if(localStorage.getItem("lang")=="en"){
      // alert(localStorage.getItem("lang"));
 //var imported = document.createElement('script');
 console.log("middle en");
    imported.src = 'lang/en.js';
    document.head.appendChild(imported);

 }else{
    imported.src = 'lang/en.js';
    document.head.appendChild(imported);

 }
 console.log("end ",localStorage.getItem("lang"));
