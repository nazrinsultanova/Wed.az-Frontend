

acceptData();

function acceptData() {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            aawriteToHtml(this.response);
        }
    };
    xhttp.open("GET", 'https://api.wed.az/edu/general/menu', true);
    xhttp.send();
}  

function aawriteToHtml(data){
    var menus = JSON.parse(data);
    var menuHtml = '';
    var secondmenus = JSON.parse(data);
    var menuHtmlsecond = '';
    var thirdmenus = JSON.parse(data);
    var menuHtmlthird = '';

    for(var i=0; i<4;i++){
        menuHtml += `
        <li>
            <a target="_blank" href="https://wed.az/${menus.data[1].name}/${menus.data[1].categories[i].urlTitle}">${menus.data[1].categories[i].name}</a>
        </li>
        `;
    }
    document.getElementById('first-dropdown').innerHTML = menuHtml;

    for(var i=0;i<8;i++){
        menuHtmlsecond += `
        <li>
             <a target="_blank" href="https://wed.az/${secondmenus.data[0].name}/${secondmenus.data[0].categories[i].urlTitle}">${secondmenus.data[0].categories[i].name}</a>
        </li>
        `;
    }
    
    document.getElementById('child-left').innerHTML =  menuHtmlsecond;


    for(var i=8;i<16;i++){
        menuHtmlthird += `
        <li>
             <a target="_blank" href="https://wed.az/${thirdmenus.data[0].name}/${thirdmenus.data[0].categories[i].urlTitle}">${thirdmenus.data[0].categories[i].name}</a>
        </li>
        `;
    }
    document.getElementById('child-right').innerHTML =  menuHtmlthird; 
}
 