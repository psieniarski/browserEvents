const BrowserEvents = require('./index');

test('browserEvents: on() should add proper listener', () => {
	const fn = jest.fn();
	const events = BrowserEvents({ rootElement: document });

	document.body.innerHTML = `
		<div>
			<ul>
				<li custom-attr-test="TEST">
					<button class="button">Test</button>
				</li>
				<li>
					<button class="button">Test</button>
				</li>
				<li>
					<button class="button">Test</button>
				</li>
				<li>
					<button class="button">Test</button>
				</li>
			</ul>
		</div>
	`

	events.on({
		eventType: 'click',
		selector: '[custom-attr-test]',
		fn
	})

	const element = document.querySelectorAll('[custom-attr-test]')[0];
	element.click()
	
  	expect(fn.mock.calls.length).toBe(1);
});


test('browserEvents: off() should prevent invoke fn', () => {
	const fn = jest.fn();
	const events = BrowserEvents({ rootElement: document });

	document.body.innerHTML = `
		<div>
			<ul>
				<li custom-attr-test="TEST">
					<button class="button">Test</button>
				</li>
				<li>
					<button class="button">Test</button>
				</li>
				<li>
					<button class="button">Test</button>
				</li>
				<li>
					<button class="button">Test</button>
				</li>
			</ul>
		</div>
	`

	events.on({
		eventType: 'click',
		selector: '[custom-attr-test]',
		fn
	})

	events.off()

	const element = document.querySelectorAll('[custom-attr-test]')[0];
	element.click()

  	expect(fn.mock.calls.length).toBe(0);
});