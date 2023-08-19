{
	console.clear();
	const win = window;
	const doc = win.document;
	const rootElement = win.$0 || doc.documentElement;
	const discardedRules = [];
	const filteredRules = [];
	{
		const pseudoRE = /[\\:]+((text-.*\w)|after|before|underline|hover|focus|active|visited|target|focus-(within|visible))/gim;
		const location = win.location;
		for (const sheet of doc.styleSheets) {
			if (!sheet.disabled) {
				const mediaQuery = sheet.media?.mediaText;
				if (!mediaQuery || win.matchMedia(mediaQuery).matches) {
					const process = obj => {
						const href = obj.href;
						if (!href || href.startsWith(location.origin)) {
							for (const rule of obj.cssRules) {
								if (rule instanceof win.CSSMediaRule) {
									if (win.matchMedia(rule.conditionText).matches) {
										process(rule);
									}
								} else if (rule instanceof win.CSSStyleRule) {
									let m = filteredRules;
									const originalSelector = rule.selectorText;
									if (!rootElement.querySelector(originalSelector)) {
										const cleanSelector = originalSelector
											.replaceAll(pseudoRE, '')
											.split(',')
											.filter(e => e.trim())
											.join(',');
										if (
											cleanSelector &&
											cleanSelector !== originalSelector &&
											(console.log({
												rule,
												originalSelector,
												cleanSelector
											}),
											rootElement.querySelector(cleanSelector))
										) {
											rule.cleanSelector = cleanSelector;
										} else {
											m = discardedRules;
										}
									}
									m.push(rule);
								}
							}
						} else {
							console.warn(obj);
						}
					};
					process(sheet);
				}
			}
		}
	}
	console.log({
		filteredRules,
		discardedRules
	});
	if (filteredRules.length) {
		const mathSansBoldMap = new Map([
			['A', '𝗔'],
			['B', '𝗕'],
			['C', '𝗖'],
			['D', '𝗗'],
			['E', '𝗘'],
			['F', '𝗙'],
			['G', '𝗚'],
			['H', '𝗛'],
			['I', '𝗜'],
			['J', '𝗝'],
			['K', '𝗞'],
			['L', '𝗟'],
			['M', '𝗠'],
			['N', '𝗡'],
			['O', '𝗢'],
			['P', '𝗣'],
			['Q', '𝗤'],
			['R', '𝗥'],
			['S', '𝗦'],
			['T', '𝗧'],
			['U', '𝗨'],
			['V', '𝗩'],
			['W', '𝗪'],
			['X', '𝗫'],
			['Y', '𝗬'],
			['Z', '𝗭'],
			['a', '𝗮'],
			['b', '𝗯'],
			['c', '𝗰'],
			['d', '𝗱'],
			['e', '𝗲'],
			['f', '𝗳'],
			['g', '𝗴'],
			['h', '𝗵'],
			['i', '𝗶'],
			['j', '𝗷'],
			['k', '𝗸'],
			['l', '𝗹'],
			['m', '𝗺'],
			['n', '𝗻'],
			['o', '𝗼'],
			['p', '𝗽'],
			['q', '𝗾'],
			['r', '𝗿'],
			['s', '𝘀'],
			['t', '𝘁'],
			['u', '𝘂'],
			['v', '𝘃'],
			['w', '𝘄'],
			['x', '𝘅'],
			['y', '𝘆'],
			['z', '𝘇']
		]);
		const toMathSansBold = str => Array.from(str, e => mathSansBoldMap.get(e) || e).join('');
		const lines = [];
		{
			const path = [];
			const notCSSStyleRules = [];
			let element = rootElement;
			const walker = doc.createTreeWalker(element, 1);
			const uuid = win.crypto.randomUUID();
			let depth = 0;
			while (element) {
				let selector = element.tagName.toLowerCase();
				if (element.id) {
					selector += `#${element.id}`;
				}
				for (const className of element.classList) {
					selector += `.${className}`;
				}
				path.length = depth;
				path[depth] = toMathSansBold(selector);
				lines.push(`/*${path.join('\u0020>\u0020')}*/`);

				for (const rule of filteredRules) {
					if (
						uuid !== rule.collectedBy &&
						(element.matches(rule.selectorText) ||
							(rule.cleanSelector && element.matches(rule.cleanSelector)))
					) {
						rule.collectedBy = uuid;
						lines.push(rule.cssText);
					}
				}

				if (walker.firstChild()) {
					++depth;
				} else {
					while (depth && !walker.nextSibling()) {
						walker.parentNode();
						--depth;
					}
				}
				element = walker.nextNode();
			}
			console.log({
				notCSSStyleRules
			});
			console.log(`%c ${lines.join('\n')}`, 'padding:10px; background:yellow;');
		}
	}
}
