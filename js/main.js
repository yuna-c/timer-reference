const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span'); // 배열
const txt = screen.querySelectorAll('em'); // em 두개 해서 am/pm 오전 오후 바뀌게 해보기

setInterval(() => {
	changeTheme();
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

//시간에 따른 테마 변경함수
function changeTheme() {
	// 배열로 담으면 어때?
	const hr = new Date().getHours();
	//빈 문자열로 초기화 시켜서 중첩 안되게, 적용됬던 class 초기화 후 조건식에 적용된 class 적용
	main.className = '';
	//조건식을 배열이나 객체로 묶어서 처리하기
	// 조건식 (객체), 문자값(객체)
	const data = [
		{ cond: hr >= 5 && hr < 10, name: 'morning' },
		{ cond: hr >= 12 && hr < 16, name: 'afeternoon' },
		{ cond: hr >= 16 && hr < 20, name: 'evening' },
		{ cond: hr >= 20 || hr < 5, name: 'night' },
	];

	data.forEach((el) => {
		//배열의 객체
		if (el.cond) main.classList.add(el.name);
	});
	/*
  const shareTime = ['hr >= 5 && hr < 10', 'hr >= 12 && hr < 16', 'hr >= 16 && hr < 20', 'hr >= 20 || hr < 5'];
	const changeClass = ['morning', 'afternoon', 'evening', 'night'];
	if (hr >= 5 && hr < 10) {
		main.classList.add('morning');
	}
	if (hr >= 12 && hr < 16) {
		main.classList.add('afeternoon');
	}
	if (hr >= 16 && hr < 20) {
		main.classList.add('evening');
	}
	if (hr >= 20 || hr < 5) {
		main.classList.add('night');
	}
  */
}
