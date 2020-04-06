				'use strict'
document.body.onload = startAction;
let arr = ['Русская баня','Римская баня', 'Финская баня',  'Японская баня', 'Инфракрасная', 'Скандинавская', 'Турецкая сауна'];
	let arrTb = [
		['images/rusSauna1.jpg','images/rusSauna2.jpg', 'images/rusSauna3.jpg'],['images/rimSauna1.jpg','images/rimSauna2.jpg', 'images/rimSauna3.jpg'], ['images/finnSauna1.jpg','images/finnSauna2.jpg', 'images/finnSauna3.jpg'], ['images/japanSauna1.jpg','images/japanSauna2.jpg', 'images/japanSauna3.jpg'],['images/infraSauna1.jpg','images/infraSauna2.jpg', 'images/infraSauna3.jpg'], ['images/scandinavianSauna1.jpg','images/scandinavianSauna2.jpg', 'images/scandinavianSauna3.jpg'],['images/turkishSauna1.jpg','images/turkishSauna2.jpg', 'images/turkishSauna3.jpg']
	]; 


function startAction(){
	let menu = document.querySelector('.menu');
	let prev = document.getElementById('prev');
	let next = document.getElementById('next');
	let position = 0;

	menu.onclick = changingTab;
	putMeaning(arr, arrTb, position);

	prev.addEventListener('click', function(){
	position > 0 ? position-- : position = arr.length - 1;
		putMeaning(arr,arrTb, position);
	});

	next.addEventListener('click', function(){
		position >= arr.length - 1  ? position = 0 : position++;
	putMeaning(arr,arrTb, position);
	});

}


function changingTab(event){
	if(event.target.tagName != 'A') return;
	let aes = document.querySelectorAll('a');
	let pic = document.getElementById('pic');

	for(let i = 0;  i < aes.length; i++){
		if(aes[i].innerHTML == event.target.innerHTML){
			aes[i].classList.add('active');
			let pos = arr.indexOf(aes[i].innerHTML, 0);
			meaningForImg(arrTb, pos, pic);
		}else{
			aes[i].classList.remove('active');	
		}
	}
}


function putClassActive(elems,evTarget,){
	for(let i = 0;  i < elems.length; i++){
		if(elems[i].innerHTML == event.target.innerHTML){
			elems[i].classList.add('active');
			let pos = arr.indexOf(elems[i].innerHTML, 0);
			meaningForImg(arrTb, pos, pic);
		}else{
			elems[i].classList.remove('active');	
		}
	}
	
}


function putMeaning(arr, arr1, startPosition){
	let views = document.querySelectorAll('.view');
	let pic = document.getElementById('pic');
	
	for(let i = startPosition, j = 0; i < startPosition + 4; i++, j++){
		arr[i] == undefined ? i = 0 : false;

		if(j >= 4) return;
			 views[j].innerHTML = arr[i];
					if(i == startPosition){
				views[0].classList.add('active');
				meaningForImg(arr1, i, pic);
					}else{
				views[j].classList.remove('active');
					}
	}
}

function meaningForImg(arr, pos, elem){
	let dotes = document.querySelectorAll('.dot');
	let localPositionActive = 0;
	let prevTb = document.getElementById('prevTb');
	let nextTb = document.getElementById('nextTb');

		getResult(pos, localPositionActive, dotes, elem, arr);

	prevTb.addEventListener('click', function(){
		localPositionActive > 0 ? localPositionActive--: localPositionActive = arr[pos].length - 1;
		getResult(pos, localPositionActive, dotes, elem, arr);
	});


	nextTb.addEventListener('click', function(){
		localPositionActive >= arr[pos].length - 1  ? localPositionActive = 0 : localPositionActive++;
		getResult(pos, localPositionActive, dotes, elem, arr);
	});


	putMeaningForDotes(dotes,elem, pos, arr);
}

function getResult(pos1, pos2,elems, elemImg, arr){
	elemImg.src = arr[pos1][pos2];
	getActive(elems, pos2);
}


function putMeaningForDotes(elems,elemShow, positionDotes, arr){
	for(let i = 0; i < elems.length; i++){
		elems[i].addEventListener('click', function(){
			getActive(elems, i);
			elemShow.src = arr[positionDotes][i];
		});
	}
} 


function getActive(elems, posD){
	let numText = document.querySelector('.num');
	for(let eachD of elems){
		posD == eachD.dataset.num - 1 ? (eachD.classList.add('active'),
		   numText.innerHTML = eachD.dataset.num + ' / 3')	: eachD.classList.remove('active');
	}
}
		