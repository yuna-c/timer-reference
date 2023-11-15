const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');

setInterval(() => {
	/*
	spanHr.innerText = hr < 10 ? '0' + hr : hr;
	spanMin.innerText = min < 10 ? '0' + min : min;
	spanSec.innerText = sec < 10 ? '0' + sec : sec;
  */

	em.innerText = new Date().getHours() /*hr*/ < 12 ? 'am' : 'pm';
	//getTime함수가 [시간,분,초]반환
	//반환된 배열값을 그대로 반복돌면서 setTime함수에 인수로 전달
	//setTime반복돌면서 시간,분,초에 1자리수일때 앞에 '0'을 붙여주는 공통로직 반복처리
	getTime().forEach((num, idx) => setTime(num, idx));
}, 1000);

//시간값을 구해서 반환하는 함수
function getTime() {
	//지역변수로 떼내기
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();
	return [hr, min, sec];
}

//반환된 시간값을 인수로 받아서 DOM에 세팅하는 함수
function setTime(num, index) {
	numbers[index].innerText = num < 10 ? '0' + num : num;
}
