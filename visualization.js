var speed=25;
function setSpeed(a){
	speed = 50 - a;
}

var vertexArray = [];
CanvasRenderingContext2D.prototype.clear = 
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }           
};
var binaryHeap = function(comp) {
  comp = comp || function(a, b) {
    return a.v > b.v;
  };


  var swap = function(a, b) {
    var temp = vertexArray[a];
    vertexArray[a] = vertexArray[b];
    vertexArray[b] = temp;
  };


  var bubbleUp = function(pos) {
    if (pos <= 0) {
      return;
    }
    var parent = Math.floor((pos - 1) / 2);
    if (comp(vertexArray[pos], vertexArray[parent])) {
      swap(pos, parent);
      bubbleUp(parent);
    }
  };
  
	var bubbleUpV = function(pos) {
	counter++;
	path.push(pos);
    if (pos <= 0) {
		setTimeout(function(){log('reached source of heap - element ' + vertexArray[pos].v + ' inserted' );}, 200);
		document.getElementById("reset").disabled = false;
		document.getElementById("send").disabled = false;
        return;
    }
    var parent = Math.floor((pos - 1) / 2);
	setTimeout(function(){log('comapring '+vertexArray[pos].v+' and its parent ' + vertexArray[parent].v);}, 200);
    if (comp(vertexArray[pos], vertexArray[parent])) {
	  setTimeout(function(){ log(vertexArray[pos].v + ' > ' + vertexArray[parent].v + ' - swaping elements'); }, 200);
      drawSwappingVertexies(pos, parent);
      
      setTimeout(function(){ swap(pos, parent); bubbleUpV(parent) }, speed*100);
	  
    }
	else {
		setTimeout(function(){log(vertexArray[pos].v + ' < ' + vertexArray[parent].v + ' - element ' + vertexArray[pos].v + ' inserted' );}, 200);
		document.getElementById("reset").disabled = false;
		document.getElementById("send").disabled = false;
	}
  };

  var that = {};

  that.push = function(value) {
    vertexArray.push(new Vertex(value));
    bubbleUp(vertexArray.length - 1);
  };
  
    that.pushV = function(value) {
    vertexArray.push(new Vertex(value));
	vertexArray[vertexArray.length-1].selected = true;
	drawHeap();
    bubbleUpV(vertexArray.length - 1);
  };



	
  return that;
};
var positionArray = [];
var t = p = 0;
var pad = [1,452,227,113,57];
var padRow = [455, 232, 119, 62, 33];
for(var i = 0; i < 32; i++){
	if((i+1) >= Math.pow(2,t)) {t++; p = 0; }
	p++;
	
	var x = padRow[t-1] + (p-1) * pad[t-1];
	var y = t*50;
	
	positionArray.push({x:x,y:y});
}
function Vertex (v){
	this.v=v;
	this.selected = false;
	this.visible = true;
}


var bh = binaryHeap();
	bh.push(57); bh.push(11);bh.push(47);bh.push(40);bh.push(37);bh.push(83);bh.push(34);bh.push(17);bh.push(3);bh.push(33);bh.push(81);bh.push(95);bh.push(63);bh.push(56);bh.push(36);
	bh.push(32);bh.push(51);bh.push(70);

console.log(vertexArray) // 2

var c;var can; var path=[];

$( document ).ready(function() {

	//vertexArray[0].selected = true;
	//vertexArray[1].selected = true;
	
	
	
  
	//drawAnimatedLine(0,0,100,100);
	//drawAnimatedLine(100,0,500,100);
	
	//drawSwappingVertexies(0,1);
    
});
var counter;
function insert(){
	var val = document.getElementById("in").value;
	counter = 1;
	for(var i=0;i<vertexArray.length;i++){
		vertexArray[i].selected = false;
		if(val == vertexArray[i].v) {
			alert('Oops, heap already contains this element');
			return;
		}
	}
	if(vertexArray.length != 0) {
	document.getElementById("reset").disabled = true;
	document.getElementById("send").disabled = true;
	}
	log('adding '+val+ ' to end of heap');
	bh.pushV(val);
}
function log(t){
	document.getElementById("log").innerHTML = t + '\n' + document.getElementById("log").innerHTML;
}

function reset (){
	vertexArray = [];
	drawHeap();
	document.getElementById("log").innerHTML = " ";
}

function drawAnimatedLine(ax,ay,bx,by){
    var waypoints=[];
    var dx=bx-ax;
    var dy=by-ay;
    for(var j=0;j<100;j++){
        var x=ax+dx*j/100;
        var y=ay+dy*j/100;
        waypoints.push({x:x,y:y});
    }
	
	var t = 0;
	var timer = setInterval(function() {
	if (t == waypoints.length-1) {clearInterval(timer); console.log('STOPED');}
	t++;
	c.beginPath();
    c.moveTo(waypoints[t-1].x,waypoints[t-1].y);
    if(t < waypoints.length) c.lineTo(waypoints[t].x,waypoints[t].y);
	c.strokeStyle = "orange";
    c.stroke();
	}, speed);
	
}
function drawSwappingVertexies(a, b){
	
	frm = {x:positionArray[a].x,y:positionArray[a].y}
	to = {x:positionArray[b].x,y:positionArray[b].y}
	
	vertexArray[a].visible = false;
	vertexArray[b].visible = false;
	
	var waypoints=[];
    var dx=to.x-frm.x;
    var dy=to.y-frm.y;
    for(var j=0;j<100;j++){
        var x=frm.x+dx*j/100;
        var y=frm.y+dy*j/100;
        waypoints.push({x:x,y:y});
    }
	
	
	var t = 0;
	var timer = setInterval(function() {
	if (t == waypoints.length-1) {clearInterval(timer); }
	t++;
	drawHeap();
	
	if(t < waypoints.length) drawVertex(vertexArray[b].v, waypoints[waypoints.length-t].x,waypoints[waypoints.length-t].y, "orange",20);
	var add = scaleRadius(t);
    if(t < waypoints.length) drawVertex(vertexArray[a].v, waypoints[t].x,waypoints[t].y, "orange",20+add);
	if(t == 99) {
		vertexArray[a].visible = true;
		vertexArray[b].visible = true;
	}
	}, speed);
} 
function scaleRadius (a) {
	
	if(a < 15 || a > 75) return 0;
	a = a-15;
	a = a / 19;
	if(Math.sin(a)*10 < 0) return 0;
	return Math.sin(a)*10;
}

function drawHeap (){
	c.clear();
	for(var i = 0; i < vertexArray.length; i++){
	drawEdgesToChildren(i);
	var color = vertexArray[i].selected ? "orange" : "black"; 
	if(vertexArray[i].visible) {
		drawVertex(vertexArray[i].v, positionArray[i].x, positionArray[i].y,color,20);
	}
	}
}


function drawEdge(a, b,x,y,color) {
	c.beginPath();
	c.moveTo(a,b);
	c.lineTo(x,y);
	c.lineWidth = 2;
	c.strokeStyle = color;
    c.stroke();
	
}

function drawEdgesToChildren (i){
	var v = positionArray[i];
	var color = "black";
	if(i*2+1 < vertexArray.length){
		var l = positionArray[i*2+1];
		if(vertexArray[i*2+1].selected && vertexArray[i].selected) color = "orange";
		else color = "black";
		drawEdge(v.x,v.y,l.x,l.y,color);
	}
	if(i*2+2 < vertexArray.length){
		var r = positionArray[i*2+2];
		if(vertexArray[i*2+2].selected && vertexArray[i].selected) color = "orange";
		else color = "black";
		drawEdge(v.x,v.y,r.x,r.y,color);
	}
}

function drawVertex(text,x,y,color,r) {
	  c.beginPath();
	  text = text.toString();
        c.fillStyle = "white";
        c.strokeStyle = color;
        c.font = r/1.33 + "px serif";
        c.lineWidth = 10;
        c.arc(x, y, r, 0, 2 * Math.PI, false);
		c.lineWidth = 3;
        c.stroke();
        c.fill();
        c.beginPath();
        c.fillStyle = "black";
        if(text.length==1) {c.fillText(text, x-r*3/20, y+r*1/4);
		} else if(text.length==3) {c.fillText(text, x-r*11/20, y+r*1/4); }
		else {c.fillText(text, x-r*2/5, y+r*1/4);}
        c.fill();
}
