(w=>{
	const d=w.document;
	for(const e of d.querySelectorAll('span')){
		const p=e.parentNode;
		let x;
		while(x=e.firstChild){
			p.insertBefore(x,e)
		};
		if(0===e.children.length){e.remove()};
	};
	d.body.normalize()
})(window);
