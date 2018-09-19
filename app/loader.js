ProgressBar.prototype = {
  stop : function(id){
	  cancelAnimationFrame(loaders[id].animationFrame);
	  loaders[id]['delta'] = loaders[id].animationFrame;
	  console.log(loaders[id]);
  },
  resume : function(id){
	  loaders[id].animationFrame = requestAnimationFrame(loaders[id].animator.bind(loaders[id]));
  }
};

let idx = 0;

function ProgressBar({ startWidth=0, timetoEnd=5000, background='1565C0'} = {}){
  this.startWidth  = startWidth;
  this.background = background;
  this.id = `pBar-${idx++}`;
  this.dataId = idx-1;
  this.delta = 0;
  this.create = () => {
	let pBar = document.createElement('div');
	pBar.id = this.id;
	pBar.className = `p-bar`;
	pBar.innerHTML = `<div class="loader">Loading...</div>
	<input class="control" type=button onclick='ProgressBar.prototype.stop(${this.dataId})' value="pause" />
	<input class="control" type=button onclick='ProgressBar.prototype.resume(${this.dataId})' value="resume" />`;
	return pBar;
  };
  this.animator = () => {
		var deltaT = 0;
		console.log(this.delta);
		if(!this.delta){
			var deltaT = Math.min(new Date().getTime() - this.start, timetoEnd);
		} else{
			var deltaT = this.delta;
			this.delta = 0;
		}
	  if(deltaT < timetoEnd){
		const width = ((100 - this.startWidth) / timetoEnd) * deltaT + this.startWidth;
		this.element.style.width = `${width}%`;
		this.element.style.background = `${this.background}`;
		this.animationFrame = requestAnimationFrame(this.animator.bind(this));
	  }
	  else if(deltaT === timetoEnd){ 
		this.element.style.width = `100%`;
		this.element.innerHTML = null;
	  }
  };
  this.animate = () => {
	this.element = document.querySelector(`#${(this.id)} div`);
	this.start = new Date().getTime();
	this.animator();
  };
}

let loaders = [];

function addLoader() {
  let bar = new ProgressBar({
	startWidth: 0,
	timetoEnd: 3000,
	background: '#1976D2'
  });
  let container = document.querySelector("#container");
  container.prepend(bar.create());
  bar.animate();
  loaders.push(bar);
}
