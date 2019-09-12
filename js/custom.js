/**/
function showText(el) {
    if(el.previousElementSibling.clientHeight === 80) {
        el.previousElementSibling.style.height = "100%";
        el.innerHTML = "Pokaż mniej..."
    } else {
    	el.previousElementSibling.style.height = "80px";
        el.innerHTML = "Czytaj więcej..."
    }
}
/*COMMENT*/
var comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    var commentName = document.getElementById('comment-name');
    var commentBody = document.getElementById('comment-body');

    var comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);
    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    var commentField = document.getElementById('comment-field');
    var out = '';
    comments.forEach(function(item){
        out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        out += `<p class="alert alert-primary" role="alert">${item.name}</p>`;
        out += `<p class="alert alert-success" role="alert">${item.body}</p>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  /*MENU_BTN*/
$('.menu_btn').on('click', function(e){
	e.preventDefault;
	$(this).toggleClass('menu_btn_active')
});