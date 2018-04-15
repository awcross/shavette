import path from 'path';
import test from 'ava';
import puppeteer from 'puppeteer';

const url = `file:${path.join(__dirname, 'fixture.html')}`;

let browser;
let page;

function check(selector) {
	const count = page.evaluate(selector => {
		const element = document.querySelector(selector);
		const target = element.querySelector('.js-shave-text');

		// Remove ellipsis to get correct rects count
		target.removeChild(target.querySelector('.js-shave-char'));

		return target.getClientRects().length;
	}, selector);

	return count;
}

function shave(element, lines) {
	page.evaluate((element, lines) => {
		window.shavette(element, {
			maxLines: lines
		});
	}, element, lines);
}

test.before(async () => {
	browser = await puppeteer.launch();
	page = await browser.newPage();

	await page.goto(url);
	await page.addScriptTag({path: path.join(__dirname, '/../dist/index.umd.js')});
});

test.after.always(() => browser.close());

test('string selector, 2 lines', async t => {
	const selector = '.test1';

	await shave(selector, 2);
	t.is(await check(selector), 2);
});

test('.querySelector(), 3 lines', async t => {
	const selector = '.test2';
	const element = await page.evaluateHandle(s => document.querySelector(s), selector);

	await shave(element, 3);
	t.is(await check(selector), 3);
});

test('.querySelectorAll(), 4 lines', async t => {
	const selector = '.test3';
	const elements = await page.evaluateHandle(s => document.querySelectorAll(s), selector);

	await shave(elements, 4);
	t.is(await check(selector), 4);
});
