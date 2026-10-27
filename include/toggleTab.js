/*
 * Show/Hide Toggle Sliding Menu With CSS & JavaScript
 * http://www.webtutorialsource.com/tutorial/show-hide-toggle-sliding-menu-css-javascript/
 * Mar 15, 2013
 
*/
 
 function toggle(id) {
    var el = document.getElementById(id);
    var img = document.getElementById("arrow");
    var box = el.getAttribute("class");
    if(box == "hide"){
        el.setAttribute("class", "show");
        //delay(img, "images/tab_close.jpg", 400);
    }
    else{
        el.setAttribute("class", "hide");
        //delay(img, "images/tab_open.jpg", 400);
    }
}

function delay(elem, src, delayTime){
    window.setTimeout(function() {elem.setAttribute("src", src);}, delayTime);
}

