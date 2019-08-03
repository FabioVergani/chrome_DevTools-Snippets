(global=>{
	const w=global,
	stringify=w.JSON.stringify,
	console=w.console,
	d=w.document,
	Blob=w.Blob,
	URL=w.URL;
	console.save=(dati,filename='console.json')=>{
		const data=('object'===typeof dati)?stringify(dati,null,4):null;
		if(null!==data){
			const a=d.createElement('a'),
			e=(
				a.href=URL.createObjectURL(new Blob([data],{type:'text/json'})),
				a.download=filename,
				d.createEvent('MouseEvents')
			);
			e.initMouseEvent(
				'click',
				true,//canBubble
				false,//cancelable
				w,//view
				0,//detail (event's mouse click count)
				0,//screenX
				0,//screenY
				0,//clientX
				0,//clientY
				false,//ctrlKey
				false,//altKey
				false,//shiftKey
				false,//metaKey
				0,//button
				null//relatedTarget
			);
			a.dispatchEvent(e)
		}else{
			console.error('no data');
		}
	}
})(window);
