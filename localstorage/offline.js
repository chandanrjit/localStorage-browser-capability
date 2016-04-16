var offorms = (function() {

    var arr_offorms = JSON.parse(localStorage.getItem("offorms") || "[]");


    var init = function(form) {
        form.addEventListener('submit', function(event) {
            if (!navigator.onLine) {
                event.preventDefault();
                var formObject = getFormObject(this);
                arr_offorms.push(formObject);
            }
        });
    }

    window.addEventListener("online", function() {
      
        submit_ofform();

    });
    window.addEventListener("unload", function() {
        var offorms = JSON.stringify(arr_offorms);
        localStorage.setItem("offorms", offorms);
    });

    var getFormObject = function(form) {

        var formObject = {
            action: form.action,
            method: form.method.toUpperCase(),
            data: ""
        }

        var elements = form.elements;

        for (var i = 0, len = elements.length; i < len; i++) {
            var el = elements[i];
            formObject.data += (formObject.data ? '&' : '') + (el.name + "=" + el.value);
        }
        return formObject;
    }
    var submit_ofform = function() {
        for (var i = 0, len = arr_offorms.length; i < len; i++) {
            var formObject = arr_offorms[0];
            arr_offorms.splice(0, 1);
            if (formObject.method == "GET") {
                //var xhr = new XMLHttpRequest();
                //xhr.open(formObject.method, xhr.action);
               // xhr.send();

                document.getElementById("dataposted").innerHTML = "Your Message" + formObject.data;

               var blob = new Blob([formObject.data], {type: "text/plain;charset=utf-8"});
               var randomNum = Math.ceil(Math.random() * 999999);
               var filename="offline"+randomNum +".txt";
               saveAs(blob, filename);
            }
        }
    }
    if (navigator.onLine) {
        submit_ofform();
        document.getElementById("divoffline").style.display="none";
    }
    else
    {
         document.getElementById("divoffline").style.display="block";
         document.getElementById("divonline").style.display="none";
    }



    return {
        init: init
    };

}());


(function(){

setInterval(function(){ 
   console.log("hello")

   if (navigator.onLine) {
        
        document.getElementById("divoffline").style.display="none";
        document.getElementById("divonline").style.display="block";
    }
    else
    {
         document.getElementById("divoffline").style.display="block";
         document.getElementById("divonline").style.display="none";
    } 
}, 2000);


}());

