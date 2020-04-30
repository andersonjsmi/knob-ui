var rKnobs = document.getElementsByClassName('knob rotation');
var sKnobs = document.getElementsByClassName('knob slider');
var swKnobs = document.getElementsByClassName('knob switch');
var labels = document.getElementsByTagName('label');

for(var cx = 0; cx < rKnobs.length; cx ++){
  rKnobs.item(cx).innerHTML = ('<span class="indicator"></span>');
  rKnobs.item(cx).innerHTML += ('<input type="hidden" name="' + rKnobs.item(cx).id + '" id="' + rKnobs.item(cx).id + '-input" value="0">');
  rKnobs.item(cx).addEventListener('wheel', knobAdjust);
}

for(var cx = 0; cx < sKnobs.length; cx ++){
  sKnobs.item(cx).innerHTML += ('<div class="bars"></div>');
  for(var cxx = 0; cxx <= 10; cxx++){
    sKnobs.item(cx).firstChild.innerHTML += ('<span class="mark"></span>');
    var numberMark = (cxx == 0 || cxx == 5 || cxx == 10);
  }
  sKnobs.item(cx).innerHTML += ('<div class="control"><div class="bar"></div></div>');
  sKnobs.item(cx).innerHTML += ('<input type="hidden" name="' + sKnobs.item(cx).id + '" id="' + sKnobs.item(cx).id + '-input" value="0">');
  sKnobs.item(cx).lastChild.addEventListener('oninput',refreshValues)
  sKnobs.item(cx).addEventListener('wheel', knobAdjust);
}

for(var cx = 0; cx < swKnobs.length; cx ++){
  swKnobs.item(cx).innerHTML = ('<span class="indicator"></span>');
  swKnobs.item(cx).innerHTML += ('<input type="hidden" name="' + rKnobs.item(cx).id + '" id="' + rKnobs.item(cx).id + '-input" value="OFF">');
  swKnobs.item(cx).style.transform = 'rotate(310deg)';
  swKnobs.item(cx).addEventListener('click', knobSwitch);
}

function refreshValues(element){
  for(var cx = 0; cx < labels.length; cx++){
    if(labels[cx].htmlFor === element.id)
      
      labels[cx].innerHTML = element.lastChild.value;
      console.log(labels[cx].htmlFor + ' === '+ element.id);
  }
}

function knobAdjust(event){
  event.preventDefault();
  var value = parseInt(this.lastChild.value);
  value += event.deltaY * -0.1;
  value = Math.min(Math.max(.100, value), 100);
  this.lastChild.value = Math.floor(value);
  if(this.classList.contains('rotation'))
    this.style.transform = 'rotate(' + ((value / 100) * 300) + 'deg)';
  if(this.classList.contains('slider'))
    this.children[1].children[0].style.transform = 'translateY(-' + (value / 100) * this.children[0].offsetHeight + 'px)';
    refreshValues(this)
}

function knobSwitch(){
  var value = this.lastChild.value;
  var rotate;
  if(value == 'OFF'){
    this.lastChild.value = 'ON'
    rotate = '50deg';
    this.classList.remove('disabled')
  }
  else{
    this.lastChild.value = 'OFF'
    rotate = '310deg';
    this.classList.add('disabled')
  }
  this.style.transform = 'rotate(' + rotate + ')';
}

