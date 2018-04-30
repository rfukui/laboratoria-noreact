function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
var posts = {};

var id =getCookie("id");
if (typeof id =='undefined'){
    window.alert("você não está logado, será redirecionado para a pagina principal");
    window.open("/index.html","_self");
}

function request(url,method="GET", json=null){
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getPosts();
        }
    }
    httpRequest.open (method, url, false);
    if (json!=null){
        httpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
        httpRequest.send(json);   
    }else{
        httpRequest.send();     
    }
}


function getPosts(){
    var url = "https://reactbook-9c220.firebaseio.com/users/"+id+"/posts.json";
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        posts = JSON.parse(this.responseText);
        allPosts()
        }
    }
    httpRequest.open ("GET", url);
    httpRequest.send();     
       
}

getPosts();

function removePost(idPost){
    if (confirm('Quer apagar mesmo essa postagem?')) {
        request("https://reactbook-9c220.firebaseio.com/users/"+id+"/posts/"+idPost+".json","DELETE");
    } 
}

function newPost(){
    url="https://reactbook-9c220.firebaseio.com/users/"+id+"/posts.json";
    var data = {};
    data.text = document.getElementById("text_post").value;
    data.privacy = document.getElementById("privacy").value;
    var json = JSON.stringify(data);                        
    request(url,"POST",json)
}


function allPosts(filter=null){
    if(posts){
        keys =  Object.keys(posts)
        var divPosts = document.getElementById("all_posts");
        divPosts.innerHTML = "";
            
        for(var i = 0; i< keys.length; i++){
            if(filter==null || filter==posts[keys[i]].privacy){
                var divPost = document.createElement('div');
                divPost.id = keys[i];
                divPost.className="mt-2 w-50";
                document.body.appendChild(divPost);
                text = posts[keys[i]].text;

                if (text.startsWith("http")){
                    text="<img src='"+text+"'class='img-fluid'/>";
                }
                document.getElementById(keys[i]).innerHTML = text
                +'<div class="justify-content-center">'
                +'<div id="div_'+keys[i]+'" style="display:none;" >'
                +'<textarea class="form-control type="textarea" id="post_'+keys[i]+'" required>'+posts[keys[i]].text+'</textarea>'
                +'<div class="custom-select mr-sm-2"><select id="privacy_'+keys[i]+'">'
                + '<option value="all">Todos</option>'
                +'<option value="friends">Amigos</option></select>'
                +'<button onclick="return editPost(\''+keys[i]+'\')">Publicar</button></div>'
                +'</div>'
                +'<div class="mt-2">'
                +'<button class="btn btn-light btn-sm" onclick="alterDisplay(\'div_'+keys[i]+'\')">editar</button>'
                +'<button class="btn btn-danger btn-sm" onclick="removePost(\''+keys[i]+'\');">deletar</button></div>';
                +'<hr/>';
                +'</div>';
                divPosts.appendChild(divPost);
            }
        }
  
    }

}

function editPost(idPost){
   url="https://reactbook-9c220.firebaseio.com/users/"+id+"/posts/"+idPost+".json";
        var data ={};
        data.text = document.getElementById("post_"+idPost).value;
        data.privacy = document.getElementById("privacy_"+idPost).value;
        var json = JSON.stringify(data);                        
        request(url,"PUT",json)
 }
function alterDisplay(div) {
    var x = document.getElementById(div);
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
return false;
}

function logout(){
    document.cookie = "id =''; expires=Thu, 01 Jan 1970 00:00:01 GMT;';"
    window.alert("você foi deslogado com suscesso!");
    window.open("/index.html","_self"); 
}