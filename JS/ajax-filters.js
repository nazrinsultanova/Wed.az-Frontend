
// acceptData();

function acceptData(){
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            Filters(this.response);
        }
    };
    xhttp.open("GET", "https://api.wed.az/edu/search?page=1&stcText=bridal-dress", true);
    xhttp.send();
}


function Filters(data){
    var filters = JSON.parse(data);
    var filtersHtml = '';
    console.log(filters);

    for(var i=0; i<7;i++){
        filtersHtml += `
        
        <div class="wedding-dress-container">
        <div class="wedding-dress-left" style="background-image: url(https://cdn.wed.az/services/${filters.data.data[i].images[0].url})">
       </div>
        <div class="wedding-dress-right">
           <div class="white-div">
              <img id="white-heart" src="icons/white-heart.svg">
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

    document.getElementById("bottom-right").innerHTML = filtersHtml;
}