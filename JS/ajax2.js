
 acceptData();


function acceptData() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            writeToHtml(this.response);
        }
    };
    xhttp.open("GET", 'https://api.wed.az/edu/general/homeblogs', true);
    xhttp.send();
}  


function writeToHtml(data){
    var advices = JSON.parse(data);
    var advicesHtml = '';
    console.log(advices);

    for(var i=0;i<2;i++){
        advicesHtml += `
        <div class="advice-box">
        <div class="upper">
           <img src="https://cdn.wed.az/blogs/${advices.data[i].id}/${advices.data[i].images[0].url}">
           <a href="https://wed.az/magazine/${advices.data[i].id}">Davamını oxu</a>
        </div>
        <div class="lower">
           <a href="https://wed.az/magazine/${advices.data[i].id}">${advices.data[i].title}</a>
           <div class="view-date">
              <p class="view">
                 <img src="icons/person.svg">
                 Wed.az
              </p>
              <p class="date">
                 <img src="icons/time.svg">
                 30 dek 2019
              </p>
           </div>
            <p style="margin-bottom: 0;">${advices.data[i].summary}</p> 
        </div>
     </div>
        `;
    }

    document.getElementById("home-advice-bottom").innerHTML = advicesHtml; 
}
            