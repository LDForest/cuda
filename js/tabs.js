const tabs = document.querySelectorAll('.tab')
const content = document.querySelectorAll('.tab-content')

const createTabs = () => {
	tabs.forEach(tabsEvent)

	function tabsEvent(item) {
		item.addEventListener('click', eventListener)
	}

	function eventListener(evt) {
		evt.preventDefault()
		const { target } = evt
		tabs.forEach(item => item.classList.remove('tab_active'))
		target.classList.add('tab_active')

		content.forEach(item => item.classList.remove('tab-content_active'))
		const active_content = `[data-tab-content="${target.getAttribute('data-tab')}"]`
		document.querySelector(active_content).classList.add('tab-content_active')
		console.log(document.querySelector(active_content))
	}
}
export default createTabs