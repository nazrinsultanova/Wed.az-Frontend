
window.addEventListener('click', function (){
    if(document.getElementById("header-dropdown").style.display=="block") { 
        document.getElementById("header-dropdown").style.display="none";
    }

}); 

function Display(e){
    e.stopPropagation();
    var x=document.getElementById("header-dropdown");

    if(x.style.display==="none")
    {
        x.style.display="block";
    }

    else
    {
        x.style.display="none";
    }
}


function ChangeImageVisibility(){
    var image=document.getElementById("myImage");

    if(image.src.match("icons/eye-icon-closed.png")){
        image.src="icons/eye-icon-open.png";
    }

    else{
        image.src="icons/eye-icon-closed.png";
    }

    var x=document.getElementById("myInput");

    if(x.type==="password")
    {
        x.type="text";
    }

    else{
        x.type="password";
    }
}


 
function addFavourite(i, j){
    var image2 = document.getElementById("white-heart"+i+'.'+j);
     if(image2.src.match("icons/red-heart.svg")){
        image2.src="icons/white-heart.svg"
     }

     else {
         image2.src="icons/red-heart.svg";
     }  
}


function Favourite(i){
    var image2 = document.getElementById("white-heart"+i);
     if(image2.src.match("icons/red-heart.svg")){
        image2.src="icons/white-heart.svg"
     }

     else {
         image2.src="icons/red-heart.svg";
     }  
}


// function Submenu(i){
//     console.log(i);
//     var y=document.getElementById("submenu-open-"+i);
 
//     if(y.style.display==="none")
//     {
//         y.style.display="block";
//     }

//     else
//     {
//         y.style.display="none";
//     }
// }
 