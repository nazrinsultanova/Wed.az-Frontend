var MAIN_URL = 'https://api.wed.az/edu/search?';
var BASE_URL = 'https://api.wed.az/edu/search?';
var url1 = 'https://api.wed.az/edu/search?page=1&stcText=bridal-dress';
// export const GOOGLE_MAP_KEY = 'AIzaSyBMMBYU10r-RuvDKvbCRQP60nwWbGYvsCA';

acceptRightData(BASE_URL);

function checkedFilter(event){
    var checkBoxs = document.getElementsByName('filter');
    var urlExtend = '';
    
    for(var i=0; i<checkBoxs.length; i++) {
        if(checkBoxs[i].checked){
            var valueItems = checkBoxs[i].value.split('-') //segment-1
            // console.log(valueItems);
            urlExtend += `&${valueItems[0]}[]=${valueItems[1]}`;
        }
    }

    // console.log(urlExtend);
    var finalUrl = url1 + ''+ urlExtend;
    acceptRightData(finalUrl);
    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress
    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress&city[]=1
    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress&city[]=1&segment[]=2
    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress&city[]=1&segment[]=2&metro[]=2
}


function Pagination(activePage){
    console.log(activePage);  
    var url = `page=${activePage}&stcText=bridal-dress`;
    BASE_URL = MAIN_URL + '' + url;
    console.log(BASE_URL);
    acceptRightData(BASE_URL);
    window.scrollTo(0, 0);
}


var btns = document.getElementsByClassName("page-item");
  for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
 });
}

var visible_elements = 3;
var elements = document.getElementsByClassName("page-item");
var total_elements = elements.length;
var start_id=0;
var last_id = visible_elements;

window.onload = function () {
    showElements(start_id, last_id, total_elements);
} 


function showElements(start,finish,total){ 
    for(var i = 0; i<total;i++){

        // var paginationItem ='';
        // paginationItem  += `
        //     <li class="page-item" onclick="Pagination(${i})">
        //         <a id="${i}" class="page-link">${i}</a>
        //     </li>
        // `;
        
        if(i>=start && i<finish){
            elements[i].style.display = "inline-block";
        }

        else{
            elements[i].style.display = "none";
        }
    }
}


function Next(){
    if((start_id + visible_elements) < total_elements){
        start_id += visible_elements-2;
        last_id += visible_elements-2;
    }

    showElements(start_id, last_id, total_elements);
}

function Previous(){
    if((start_id - 1) >= 0){
        start_id = start_id - 1;
        last_id  = last_id - 1;
    }
    showElements(start_id, last_id, total_elements);
}



function acceptRightData(urlT, whereIs) {

    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200) {
            showSearchData(this.response);
            showRightData(this.response);
            showMapData(this.response);
           
        }
    };
    xhttp.open("GET", urlT, true);
    xhttp.send();

}


function showRightData(data){
    var filters = JSON.parse(data);
    var filtersHtml = '';
 
    for(var i=0; i<filters.data.data.length;i++){
        filtersHtml += `
    
        <div class="wedding-dress-container">
        <div class="wedding-dress-left" style="background-image: url(https://cdn.wed.az/services/${filters.data.data[i].images.length && filters.data.data[i].images[0].url})">
       </div>
        <div class="wedding-dress-right">
           <div class="white-div">
            <img id="white-heart${i}" src="https://wed.az/static/media/${filters.data.data[i].images[0].wishList == 0 ? 'Frame 2.54.c4c248f5.svg' : 'Frame 2.54.c4c248f5.svg'}" onclick="Favourite(${i})">
          </div>
              <a class="wedding-dress-link" href="https://wed.az/${filters.data.data[i].urlTitle}">
                 <h4>${filters.data.data[i].title}</h4>
                 <p>Keyfiyyəti, fərqliliyi və üstünlüyü ilə seçilən gəlinlik və ziyafət geyimlərinin satışı ilə məşğul olan VEGUL Wedding ...</p>
              </a>
              <p class="wedding-dress-location">
                 <img src="icons/icon1.svg">
                    ${filters.data.data[i].district} ,
                    ${filters.data.data[i].city}
              </p>
        </div>
     </div>
       `;
    }

    // document.getElementById("bottom-right").innerHTML = filtersHtml;
}


function showMapData(data){
    var filters = JSON.parse(data);
    var features = [];
    
    for(var i=0; i<filters.data.data.length;i++){
        features.push(
            {
                placeName: filters.data.data[i].title,
                position: new google.maps.LatLng(Number(filters.data.data[i].address.main.service_latitude), Number(filters.data.data[i].address.main.service_longitude)),
                type: 'info',
                image: `https://cdn.wed.az/services/${filters.data.data[i].images.length && filters.data.data[i].images[0].url}`
            }
       );
    }
    console.log(features);
    initMap(features);
}


acceptData();

function acceptData(){
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            bridalDress(this.response);
        }
    };
    xhttp.open("GET", 'https://api.wed.az/edu/filters/bridal-dress', true);
    xhttp.send();

    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress
    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress&city[]=1
    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress&city[]=1&segment[]=2
    // https://api.wed.az/edu/search?page=1&stcText=bridal-dress&city[]=1&segment[]=2&metro[]=2
}


 function bridalDress(data){
    var bridal = JSON.parse(data);
    var bridalHtml = '';
    console.log(bridal);
    
    for(var i in bridal.data){
        if(bridal.data[i]){
            if(bridal.data[i].name){
                // console.log(i);
                // console.log(bridal.data[i]);
                if(bridal.data[i].data){
                    if(bridal.data[i].data.length > 0){

                        bridalHtml +=
                
                `
            <li class="dropdown-li">
                    <span onclick="Submenu('${i}')">
                        <p class="filter-name">${bridal.data[i].name}</p>
                        <img id="arrow-img" src="icons/arrow2.svg">
                    </span>
                    </li>
                    
                    <ul id="submenu-open-${i}" class="submenu-open">`;
                    
                    for(var j=0;j<bridal.data[i].data.length;j++){
                        
                            bridalHtml += `
                            <li class="submenu-item">
                            <label class="chechbox-container">
                            <div>
                                <input onchange="checkedFilter(this)" type="checkbox" name="filter" value="${i}-${bridal.data[i].data[j].id}">
                                        ${bridal.data[i].data[j].name}
                            </div>
                            <span class="amount"></span>
                            </label>
                        </li>`;
                        }
                    }
                    
               bridalHtml +=`
               </ul>
               </li>`; 
            }
        }
    }
//    document.getElementById("dropdown-filter").innerHTML = bridalHtml;
  }
}


function Submenu(i) {
    var y=document.getElementById("submenu-open-"+i);
    document.getElementsByClassName('submenu-open')[0].style.display;

    var element = document.getElementById("submenu-open-"+i);
    element.classList.toggle("open");

   
    if(y.style.display==="none" || y.style.display == '')
    {
        y.style.display="block";
    }

    else
    {
        y.style.display="none";
    }

     
    var menu = document.getElementsByClassName("submenu-open");
    for (var j = 0; j < menu.length; j++) {
        menu[j].addEventListener("click", function() {
            var dropdown = document.getElementsByClassName("open");
            dropdown[0].className = dropdown[0].className.replace(" open", "");
            this.className += " open";
        });
    }
}

 

// function checkedFilter(event){
//     var checkBoxs = document.getElementsByName('filter');
//     var urlExtend = '';
    
//     for(var i=0; i<checkBoxs.length; i++) {
//         if(checkBoxs[i].checked){
//             var valueItems = checkBoxs[i].value.split('-') //segment-1
//             // console.log(valueItems);
//             urlExtend += `&${valueItems[0]}[]=${valueItems[1]}`;
//         }
//     }

//     console.log(urlExtend);
//     var finalUrl = BASE_URL+''+urlExtend;
//     acceptRightData(finalUrl);
// }


var swtch = document.getElementsByClassName("switch-map");
  for (var i = 0; i < swtch.length; i++) {
  swtch[i].addEventListener("click", function() {
  var change = document.getElementsByClassName("disabled");
  change[0].className = change[0].className.replace(" disabled", "");
  this.className += " disabled";
 });
}

var swtch = document.getElementsByClassName("switch-list");
  for (var i = 0; i < swtch.length; i++) {
  swtch[i].addEventListener("click", function() {
  var change = document.getElementsByClassName("disabled");
  change[0].className = change[0].className.replace(" disabled", "");
  this.className += " disabled";
 });
}


function initMap(features) {
    var options = {
        zoom:12,
        center: {lat:40.370109, lng:49.847574} 
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

    var infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < features.length; i++) {
        var data = features[i]
        var marker = new google.maps.Marker({
            position: data.position,
            icon: 'icons/purple-heart.png',
            map: map,
        });

        (function (marker, data) {
            google.maps.event.addListener(marker, "click", function (e) {
                infoWindow.setContent(`<div style = "width:160px; height:177px; overflow:hidden">
                    <div class="info-img" style="width:160px; height:115px">
                    <img style="width:100%; height:100%" src="${data.image}">
                    </div>
                    <a href="#" style="color:#3A3A3A"><h3>${data.placeName}</h3></a>
                    </div>`);
                infoWindow.open(map, marker);
            });
        })(marker, data);
    }

    map.addListener('click', function() {
        if (infoWindow){
        infoWindow.close();
        }  
    });
}


 

function showSearchData(data){
    var search = JSON.parse(data);
    var searchHtml = '';
    var len = search.data.data.length;
    console.log(search);
    console.log(len);
 
    for(var i=0; i < len;i++){
        searchHtml += `
        <li class="search-item">
        <a class="search-link" href="https://wed.az/${search.data.data[i].urlTitle}">
           <div class="search-left">
              <p>${search.data.data[i].title}</p>
           </div>
           <div class="search-right" style="background-image: url(https://cdn.wed.az/services/${search.data.data[i].images.length && search.data.data[i].images[0].url})";></div>
        </a>
     </li>
       `;
    }
    if(len === 0) {
        searchHtml += `
        <li class="search-item">
            Məlumat tapılmadı
        </li>
       `;
    }
    document.getElementById('search-result').innerHTML = searchHtml;
}


 var SEARCH_URL = 'https://api.wed.az/edu/search?q=';

 window.addEventListener('click', function (){
    if(document.getElementById("search-result").style.display=="block") { 
        document.getElementById("search-result").style.display="none";
    }

}); 

function Search(e){
    e.stopPropagation();
    var input = document.getElementById('myInput').value.toUpperCase();
    var ul = document.getElementById('search-result');
    var li = ul.getElementsByTagName('li');
    console.log(li);

   
    if(input.length == 0){
        ul.style.display = "none";
    }
    else{
        ul.style.display = "block";
    }

    for(var i=0; i<li.length;i++){
        var a = li[i].getElementsByTagName('a')[0];
        var textValue = a.textContent || a.innerHTML;

        if(textValue.toUpperCase().indexOf(input) > -1){
            li[i].style.display = '';
        }
        else{
            li[i].style.display = 'none';
        }
    }


    MAIN_URL = SEARCH_URL + input; 
    console.log(MAIN_URL);
    acceptRightData(MAIN_URL);
}
