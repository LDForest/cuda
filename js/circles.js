import Circles from 'Circles';

const circles = document.querySelectorAll('.circle')
const colors = ["#30bae7", "#d74680", "#15c7a8", "#eb7d4b"]

function getRandomOf(arr) {
	const num = Math.floor(Math.random() * arr.length)
	return arr[num]
}
const createCircles = () => circles.forEach((item, i) => {
		const id = item.getAttribute('id')
		const color = colors[i] || getRandomOf(colors)
		const value = item.innerText
		Circles.create({
			id,
			radius: 80,
			value,
			maxValue: 100,
			width: 10,
			text: function(value) { return value + '%'; },
			colors: ['#dfe8ed', color],
			duration: 400,
			wrpClass: 'circles-wrp',
			textClass: 'circles-text',
			styleWrapper: true,
			styleText: true
		})
	})

export default createCircles