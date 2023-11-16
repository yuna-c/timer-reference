const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span'); // 배열
const txt = screen.querySelectorAll('em'); // em 두개 해서 am/pm 오전 오후 바뀌게 해보기
const btns = main.querySelectorAll('nav span');
console.log(btns);

// 자주 바뀔만한 값을 전역변수 형태로 객체를 배열로 묶어두는 형태로 따로 빼서 관리
// 해당 값이 아래 함수에서 호출되도록 처리
// const hr = new Date().getHours(); 이거 왜 안대?
const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 10, name: 'morning' },
	{ cond: new Date().getHours() >= 12 && new Date().getHours() < 16, name: 'afeternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

let timer = setInterval(() => {
	//data전역변수를 인수로 받아서 호출처리 (파라미터화)
	changeTheme(data);
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}, 1000);

btns.forEach((btn) => {
	//각 버튼 클릭시
	btn.addEventListener('click', (e) => {
		//클릭한 버튼만 활성화
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');
		// 기존 자동롤링기능 끊어줌
		clearInterval(timer);
		//메인 요소의 모든 클래스 제거
		main.className = '';
		// 클릭한 버튼의 글자를 가져와서 소문자로 변경한 다음 메인 요소의 클래스명으로 지정
		main.classList.add(e.currentTarget.innerText.toLowerCase());
	});
});

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
	// numbers도 파라미터로 받는게 맞음 (잘못 들어갔을 경우)
	// 호출 될 때//
}

//시간에 따른 테마 변경함수
function changeTheme(data) {
	// const hr = new Date().getHours();
	//전역 data를 바로 활용하는 것이 아닌 info라는 파라미터를 통해서 전달받도록 처리
	main.className = '';

	data.forEach((el) => {
		if (el.cond) main.classList.add(el.name);
	});
	/*
  const changeData = [
    {time : hr >= 5 && hr < 10, value : 'morning'},
    {time : hr >= 12 && hr < 16, value : 'afternoon'},
    {time : hr >= 16 && hr < 20, value : 'evening'},
    {time : hr >= 20 || hr < 5, value : 'night'}
  ]
  */
}

//clearinterver
