(w=>{
	const d=w.document,dE=d.documentElement;
	if(dE){
		const walker=d.createTreeWalker(dE,1);
		while(walker.nextNode()){
			const e=walker.currentNode;
			if(e.hasAttribute('class')){
				e.removeAttribute('class')
			}
		}
	}
})(window);
