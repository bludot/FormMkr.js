var  FormMkr = function (classname, action, title, inputs, end) {
	this.Form = function () {
		return document.createElement('form');
		
	}
	;
	var  form       = new this.Form();
	form.onsubmit  = action;
	form.className = 'FormMkr '+classname;
	form.append    = function (node) {
		this.appendChild(node);
		
	}
	;
	this.Title = function (info) {
		var  temp              = document.createElement('div');
		temp.className        = 'topbar';
		temp.text             = document.createTextNode(info.text);
		temp.style.cssText   += info.css;
		temp.style.lineHeight = temp.style.height;
		temp.appendChild(temp.text);
		return temp;
		
	}
	;
	  if(title) {
		form.topbar = new this.Title(title);
		//form.append(form.topbar);
		
	}
	;
	var  range = function (start, end) {
		  var  value = 0;
		var  container = function () {
			var  temp       = document.createElement('div');
			temp.className = 'range-container';
			return temp;
			
		}
		;
		  var  range = function () {
			var  temp       = document.createElement('div');
			temp.className = 'range';
			return temp;
			
		}
		;
		var  knob = function () {
			var  temp       = document.createElement('div');
			temp.className = 'knob';
			return temp;
			
		}
		;
		var  info = function () {
			var  temp            = document.createElement('div');
			temp.className      = 'info';
			temp.font           = document.createElement('font');
			temp.font.text      = document.createTextNode('0');
			temp.font.className = 'font';
			temp.appendChild(temp.font);
			temp.font.appendChild(temp.font.text);
			return temp;
			
		}
		;
		var  start = start;
		var  end = end;
		var  temp        = new container();
		temp.val = 0;
		temp.range      = new range();
		temp.range.knob = new knob();
		temp.info       = new info();
		temp.appendChild(temp.range);
		temp.range.appendChild(temp.range.knob);
		temp.range.knob.appendChild(temp.info);
		var  mouseup = function (){
			temp.info.style.opacity = 0;
			document.removeEventListener('mousemove', mousemove, false);
			delete mousemove.temp;
			delete mousemove.tempY;
			
		}
		;
		var  mousemove = function (e) {
			var  e = e  ||  window.event;
			this.temp   = this.temp  ||  e.pageX;
			this.tempY  = this.tempY  ||  e.pageY;
			if((e.pageX-this.temp) >= 0  &&  (e.pageX-this.temp) <= (temp.range.clientWidth-10)) {
				this.val                   = (e.pageX-this.temp);
				temp.info.style.opacity    = 1;
				temp.info.font.text.data   = temp.val                                    = range.value                                    = Math.floor(((this.val)/(temp.range.clientWidth-10))*end);
				temp.info.style.marginLeft = -(temp.info.clientWidth/2)-1+'px';
				
			}
			else {
				if(e.page-this.temp <= 0) {
					this.val = 0;
					
				}
				else if(e.pageX-this.temp >= (temp.range.clientWidth-10)) {
					this.val = (temp.range.clientWidth-10);
					
				}
				
			}
			if((e.pageY-this.tempY) < -40  ||  (e.pageY-this.tempY) > 30)      {
				//mouseup();
				
			}
			temp.range.knob.style.left = this.val+'px';
			window.addEventListener('mouseup', mouseup, false);
			
		}
		;
		var  mousedown = function () {
			//temp.parentNode.addEventListener('mousemove', mousemove, false);
			document.addEventListener('mousemove', mousemove, false);
			
		}
		;
		temp.range.knob.addEventListener('mousedown', mousedown, false);
		    return temp;
	}
	;
	this.Input = function (info) {
		var  div            = document.createElement('div');
		if(info.type == 'buttons') {
			div.className     = 'holder '+info.type;
			div.inputs        = [];
			div.div           = document.createElement('div');
			div.div.className = 'holder2';
			for(var  i in info.nodes) {
				div.div.container = document.createElement('label');
				div.div.container.className = 'input-container '+info.nodes[i].class;
				div.inputs[i]           = document.createElement('input');
				div.inputs[i].name		= info.nodes[i].name;
				div.inputs[i].type      = info.nodes[i].type;
				div.inputs[i].className = 'input-buttons '+info.nodes[i].class;
				if(info.nodes[i].func) {
					console.log('test');
					div.inputs[i].func = info.nodes[i].func;
					div.inputs[i].addEventListener('click', function () {
						console.log('test event');
						console.log(this);
						window.teste = this;
						//this.func = func;
						//console.log(this.func);
						this.func(form);
						
					}
					, false);
					
				}
				if(info.nodes[i].type != 'submit'  &&  info.nodes[i].type != 'button')        {
					div.inputs[i].className = 'inputs '+info.nodes[i].class;
					
				}
				//div.inputs[i].value     = info.nodes[i].value;
				if(info.nodes[i].text) {
					div.inputs[i].text      = document.createElement('font');
					div.inputs[i].text.className = 'toggle-text';
					div.inputs[i].text.text = document.createTextNode(info.nodes[i].text);
					div.inputs[i].text.appendChild(div.inputs[i].text.text);
					div.div.container.appendChild(div.inputs[i].text);
					
				}
				div.div.container.appendChild(div.inputs[i]);
				div.div.appendChild(div.div.container);
				if(info.nodes[i].value) {
					div.inputs[i].value = info.nodes[i].value;
					
				}
				Object.defineProperties(div.inputs[i], {
					"value": {
						get: function  ()		      {
							if(this.checked != 'undefined')            {
								return this.checked ? 1 : 0;
								
							}
							else {
								return this.value ? 1 : 0;
								
							}
							
						}
						
					}
					
				});
				if(info.nodes[i].display) {
					div.inputs[i].parentNode.style.display = info.nodes[i].display;
					
				}
				
			}
			div.appendChild(div.div);
			
		}
		else if(info.type == 'range') {
			div.className      = 'holder '+info.type;
			div.text           = document.createElement('div');
			div.text.text      = document.createTextNode(info.text);
			div.text.className = 'text';
			div.input          = new range(info.start, info.end);
			Object.defineProperties(div, {
				"value": {
					get: function  ()		      {
						return this.input.val;
						
					}
					
				}
				
			});
			//div.input.value.onchange = function(){};
			div.appendChild(div.text);
			div.appendChild(div.input);
			div.text.appendChild(div.text.text);
			div.onselectstart = function (){
				return false
			}
			;
			
		}
		else if(info.type == 'button'  ||  info.type == 'submit') {
			div.className           = 'holder input-'+info.type;
			div.input               = document.createElement('input');
			div.input.type          = info.type;
			div.input.value         = info.text;
			if(info.style) {
				div.style.cssText    += info.css;
				
			}
			if(info.placeholder) {
				div.input.placeholder = info.placeholder;
				
			}
			div.appendChild(div.input);
			
		}
		else if(info.type == 'hidden') {
			div           = document.createElement('input');
			div.type      = info.type;
			div.className = info.class  ||  'input';
			div.value     = info.value;
			div.style.css = '';
			
		}
		else {
			div.className           = 'holder input-'+info.type;
			div.text                = document.createElement('div');
			div.text.text           = document.createTextNode(info.text);
			div.text.className      = 'text';
			div.appendChild(div.text);
			div.input               = document.createElement('input');
			div.input.type          = info.type;
			if(info.style) {
				div.style.cssText    += info.css;
				
			}
			if(info.value) {
				div.input.value = info.value;
			}
			if(info.placeholder) {
				div.input.placeholder = info.placeholder;
				
			}
			div.appendChild(div.input);
			div.text.appendChild(div.text.text);
			Object.defineProperties(div, {
				"value": {
					get: function  ()		      {
						return this.input.value;
						
					}
					
				}
				
			});
			
		}
		return div;
		
	}
	;
	  if(inputs) {
		form.inputs = [];
		for(var  i in inputs) {
			//var input = new this.Input(inputs[i]);
			//form.inputs.push(input);
			form.inputs[i] = new this.Input(inputs[i]);
			
		}
		;
		
	}
	;
	window.testit = form;
	for(var  i in form) {
		if(form[i] instanceof Node) {
			console.log(i);
			var  blackL = ['lastElementChild', 'firstElementChild', 'ownerDocument', 'lastChild', 'firstChild'];
			if(blackL.indexOf(i) == -1){
				if(form[i].tagName) {
					form.append(form[i]);
					
				}
				
			}
			
		}
		else if((form[i]) instanceof Array) {
			for(var  a in form[i]) {
				form.append(form[i][a]);
				
			}
			
		}
		
	}
	;
	if(end) {
		//form.last = [];
		var  num = form.inputs.length;
		for(var  i in end) {
			form.inputs.push(new this.Input(end[i]));
			
		}
		for(var  a in form.inputs) {
			if(a >= num)      {
				form.append(form.inputs[a]);
				      
			}
			
		}
		
	}
	form.designV = 'default';
	Object.defineProperties(form, {
		"design_": {
			get: function  ()      {
				return this.designV;
				
			}
			
		}
		,    "design": {
			set: function  (x) {
				if(x == 'flat') {
					this.style.borderRadius        = 0+'px';
					this.topbar.style.borderRadius = 0+'px';
					for(var  i in this.inputs) {
						this.inputs[i].style.borderRadius       = 0+'px';
						if(this.inputs[i].input) {
							this.inputs[i].input.style.borderRadius = 0+'px';
							this.inputs[i].input.style.textIndent   = 0+'px';
							
						}
						else if(this.inputs[i].inputs) {
							for(var  k in this.inputs[i].inputs) {
								this.inputs[i].inputs[k].style.borderRadius = 0+'px';
								this.inputs[i].inputs[k].style.textIndent   = 0+'px';
								
							}
							
						}
						
					}
					
				}
				else if(x == 'round') {
					this.topbar.style['border-top-left-radius']  = 8+'px';
					this.topbar.style['border-top-right-radius'] = 8+'px';
					this.style.borderRadius                      = 8+'px';
					for(var  i in this.inputs) {
						this.inputs[i].style.borderRadius       = 5+'px';
						if(this.inputs[i].input) {
							this.inputs[i].input.style.borderRadius = 5+'px';
							this.inputs[i].input.style.textIndent   = 4+'px';
							
						}
						else if(this.inputs[i].inputs) {
							for(var  k in this.inputs[i].inputs) {
								this.inputs[i].inputs[k].style.borderRadius = 5+'px';
								this.inputs[i].inputs[k].style.textIndent   = 4+'px';
								
							}
							
						}
						
					}
					
				}
				;
				
			}
			
		}
		,    "themecolors_": {
			get: function () {
				return 0;
				      
			}
			
		}
		,    "themecolors": {
			      set: function (x) {
				this.topbar.style.background      = x[0];
				this.style.background             = x[1];
				for(var  i in this.inputs) {
					this.inputs[i].style.background = x[2];
					        
				}
				
			}
			
		}
	});
	return form;
}
;
