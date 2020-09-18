


function login(){
    var formData = new FormData();
    formData.append("type", 'email');
    formData.append("login", document.getElementById('email').value);
    formData.append("password", document.getElementById('myInput').value);


    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.response);
            console.log(data.token);
            localStorage.setItem('token' , data.token);
        }
    };
     
    xhttp.open("POST", 'https://api.wed.az/edu/login', true);
    xhttp.setRequestHeader('Authorization', 'bearer '+ 'token');
    xhttp.send(formData);
} 
 
 