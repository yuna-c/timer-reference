const screen = document.querySelector('.screen');
const [spanHr, spanMin, spanSec] = screen.querySelectorAll('span');
const em = screen.querySelector('em');

setInterval(() => {
	const now = new Date();
	let hr = now.getHours();
	let min = now.getMinutes();
	let sec = now.getSeconds();

	spanHr.innerText = hr < 10 ? '0' + hr : hr;
	spanMin.innerText = min < 10 ? '0' + min : min;
	spanSec.innerText = sec < 10 ? '0' + sec : sec;

	em.innerText = hr < 12 ? 'am' : 'pm';
}, 1000);
