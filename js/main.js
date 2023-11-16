const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');
const btns = main.querySelectorAll('nav span');

const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 11, name: 'morning' },
	{ cond: new Date().getHours() >= 11 && new Date().getHours() < 16, name: 'afeternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

//1초마다 전자시계 출력 함수 호출
//특정함수에 콜백함수를 전달할 때 함수 호출 구문이 아닌 정의문 형태로 전달
//setWatch처럼 함수명만 넣으면 정의형태이기 때문에 바로등록하능
setInterval(setWatch, 1000); //호출문

//changeTheme의 경우는 data라는 인수를 전달해야 하기 때문에 () 붙여야 함
//()를 붙이는 순간에 정의형태가 아닌 호출형태로 변경되므로 다시 익명함수로 호출문을 Wrapping해서 정의형태로 변경
let timer = setInterval(() => changeTheme(data), 1000); //()=>{blabla(),1000} 익명함수로 감싸서 정의 형태로 변경(외부 함수 자체를 불러오기 때문에, 원하는 시점에 호출 시켜야 되니까 묶어놔야지!)

btns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');

		clearInterval(timer);
		main.className = '';
		main.classList.add(e.currentTarget.innerText.toLowerCase());
	});
});

// 시계함수 분리
function setWatch() {
	em.innerText = new Date().getHours() < 12 ? 'am' : 'pm';
	getTime().forEach((num, idx) => setTime(num, idx));
}

function getTime() {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	hr = hr > 12 ? hr - 12 : hr;
	return [hr, min, sec];
}

function setTime(num, idx) {
	numbers[idx].innerText = num < 10 ? '0' + num : num;
}

function changeTheme(data) {
	main.className = '';

	data.forEach((el) => {
		if (el.cond) main.classList.add(el.name);
	});
}
