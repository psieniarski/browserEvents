const BrowserEvents = ({
	rootElement = document
}) => {
	var listeners = [];
	var globalEventTypes = new Set(); 

	const dispatcher = (e) => {
		listeners[e.type].forEach((selectorFn) => {
			if (e.target.matches(selectorFn.selector)) {
				selectorFn.fn(e);
			}
		})
	}

	const removeGlobalEventListener = () => {
		rootElement.removeEventListener(Array.from(globalEventTypes).join(' '), dispatcher, false);
	}

	const addGlobalEventListner = () => {
		rootElement.addEventListener(Array.from(globalEventTypes).join(' '), dispatcher, false);
	}

	const on = ({
	  	selector = '*',
	  	eventType = 'click',
	  	fn = () => { console.warn('on: fn use default callback.') }
	}) => {
		const eventsNames = eventType.split(' ');

		eventsNames.forEach((eventType) => {
			const selectorsfns = listeners[eventType];
			if (listeners.hasOwnProperty(eventType)) {
				selectorsfns.push({
					selector,
					fn
				})
				return;
			}

			listeners[eventType] = [{
				selector,
				fn
			}]
			
			removeGlobalEventListener();
			globalEventTypes.add(eventType);
			addGlobalEventListner();
		})

	}

	const off = () => {
		removeGlobalEventListener();
		listeners = [];
		globalEventTypes = new Set();
	}

	return {
		on,
		off
	}
}

module.exports = BrowserEvents; 