const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span'); // 배열
const txt = screen.querySelectorAll('em'); // em 두개 해서 am/pm 오전 오후 배뀌게 해보기

setInterval(() => {
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
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

	// 현재 시간값이 13이 넘어가면 13시가 아닌 01시로 출력
	if (hr > 12) {
		hr = hr - 12;
	} else {
		hr;
	}
	// hr = hr > 12 ? hr-12 : hr
	return [hr, min, sec];
}

//반환된 시간값을 인수로 받아서 DOM에 세팅하는 함수
function setTime(num, idx) {
	numbers[idx].innerText = num < 10 ? '0' + num : num;
}
