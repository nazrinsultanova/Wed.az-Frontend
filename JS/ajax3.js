
acceptData();

function acceptData(){
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            Write(this.response);
        }
    };
    xhttp.open("GET", 'https://api.wed.az/edu/service/homeservices', true);
    xhttp.send();
}  


function Write(data){
    var services= JSON.parse(data);
    var servicesHtml = '';
    console.log(services);


    for(var i=0;i<5;i++){
     
         servicesHtml += `

            <div class="places-top">
               <div class="places-top-left">
                  <h2 style="margin: 0;">${services.data[i].name}</h2>
                  <p style="font-size: 18px;">${services.data[i].title}</p>
               </div>
               <div class="places-top-right">
                  <a class="right-button" href="#">
                  <img src="icons/white-plus.svg">
                  Hamısına bax</a>
               </div>
            </div>
            <div class="flex-container">`;

            for(var j=0;j<4;j++){
               
               servicesHtml += 
               `<div class="places-bottom">
                  <div class="places-box">
                  <a href="https://wed.az/${services.data[i].items[j].urlTitle}">
                     <img src="https://cdn.wed.az/services/${services.data[i].items[j].images[0].url}">
                     </a>
                     <div class="white-div">
                        <img id="white-heart${i}.${j}" src="https://wed.az/static/media/${services.data[i].items[j].images[0].wishList == 0 ? 'Frame 2.54.c4c248f5.svg' : 'Frame 2.54.c4c248f5.svg'}" onclick="addFavourite(${i},${j})">
                     </div>
                  </div>
                  <div class="places-box-second">
                     <div class="places-box-content-upper">
                        <a href="https://wed.az/${services.data[i].items[j].urlTitle}">
                           <h4>${services.data[i].items[j].title}</h4>
                        </a>
                     </div>
                     <div class="places-box-content-lower">
                        <p>
                           <img src="icons/icon1.svg">
                           Yasamal, Bakı
                        </p>
                     </div>
                  </div>
               </div>
               `;
            }
            servicesHtml += `</div>`;
        }
        document.getElementById("div-1110").innerHTML = servicesHtml;

      }
   