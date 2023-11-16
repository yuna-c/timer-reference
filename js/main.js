const main = document.querySelector('main');
const screen = document.querySelector('.screen');
const em = screen.querySelector('em');
const numbers = screen.querySelectorAll('span');
const btns = main.querySelectorAll('nav span');
const btnAuto = main.querySelector('.auto');

const data = [
	{ cond: new Date().getHours() >= 5 && new Date().getHours() < 11, name: 'morning' },
	{ cond: new Date().getHours() >= 11 && new Date().getHours() < 16, name: 'afeternoon' },
	{ cond: new Date().getHours() >= 16 && new Date().getHours() < 20, name: 'evening' },
	{ cond: new Date().getHours() >= 20 || new Date().getHours() < 5, name: 'night' },
];

setInterval(setWatch, 1000);

// 1. 로딩 되자마자 1초 간격으로 changeTheme 반복실행
let timer = setInterval(() => changeTheme(data), 1000);

// 2. 메뉴버튼 클릭시 강제로 clearInterval(timer)로 changeTheme 반복 중지
btns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		btns.forEach((btn) => btn.classList.remove('on'));
		e.currentTarget.classList.add('on');

		clearInterval(timer);
		main.className = '';
		main.classList.add(e.currentTarget.innerText.toLowerCase());
	});
});

// 3. auto 버튼 클릭시 다시 1초간격으로 changeTheme반복 실행
btnAuto.addEventListener('click', () => {
	timer = setInterval(() => changeTheme(data), 1000);
	btns.forEach((btn) => btn.classList.remove('on'));
	console.log(btnAuto);
});

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
