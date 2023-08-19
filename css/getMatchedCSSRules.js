{
	const w = window, el = w.$0;
	if (el) {
        const fn = w.matchMedia;
		const m = [];
		const loop = rules => {
			for (const rule of rules) {
				if (rule instanceof CSSMediaRule) {
					if (fn(rule.conditionText).matches) {
						loop(rule.cssRules);
					}
				} else if (rule instanceof CSSStyleRule) {
					if (el.matches(rule.selectorText)) {
						m.push(rule.cssText);
					}
				}
			}
		};
		for (const sheet of w.document.styleSheets) {
			loop(sheet.cssRules);
		}
		console.log(m.join('\n'));
	}
};
