var interactiveObj;
var extraParameters="";
var result = 2;
var img;
var context;
var canvas;
var alpha;
function questionInteractive()
{
	this.parameterNotSetFlag = 0;
	this.numRangeArr = new Array();
	this.x=0;
	this.y=0;
	this.i=0;
	this.q=0;
	this.j=0;
	this.angle=0;
	this.z=0;
	this.fadingparts=0;
	this.fade=0;
	this.k=0;
	this.w=0;
	this.h=0;
	this.fade=0;
	this.width=0;
	this.namepos=75;
	/*if(typeof getParameters['numberLanguage']=="undefined") this.numberLanguage = "english";
	else this.numberLanguage = getParameters['numberLanguage'];
	if(typeof getParameters['language']=="undefined") language = "english";
	else language = getParameters['language'];
	if(typeof getParameters['objectname']=="undefined") this.parameterNotSetFlag=1;
	else this.objectname = getParameters['objectname']);
	*/	
	if(typeof getParameters['names']=="undefined")
	{
	 this.parameterNotSetFlag=1; 
	alert("Define Names");
	$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
	else this.names =getParameters['names'].split("|");
	
	if(typeof getParameters['equalparts']=="undefined") 
	{
	 this.parameterNotSetFlag=1; 
	alert("Defina Equal Parts");
	$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	}
	else this.equalparts = getParameters['equalparts'].split("|");
	
	if(typeof getParameters['partsfaded']=="undefined")
	{
	 this.parameterNotSetFlag=1; 
	alert("Define Parts to be faded");
	$("#container").html("<h2><center>Parameter Not Set</center></h2>");
	} 
	else this.partsfaded = getParameters['partsfaded'].split("|");
	
	/*lang=getParameters['numberLanguage'];*/	

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
}
questionInteractive.prototype.init = function()
{
	img=[];

	interactiveObj.containerwidth= 160*interactiveObj.names.length;
	
	
	$("#container").css('width',interactiveObj.containerwidth);
	$('#replayButton').css('width', interactiveObj.containerwidth);
	$("#replayButton").css('margin-left',interactiveObj.containerwidth-10);
		
		
	timer=setInterval("loadimage();",1000);
	
}
// -------------- fucntion.init Closure

function loadimage()
{
	
	if (interactiveObj.i<interactiveObj.names.length )
	{
		img[interactiveObj.i] = new Image();
		var imageObj = img[interactiveObj.i];
		
		imageObj.src="../assets/pizza.png"; 
		
		interactiveObj.containerheight=40+imageObj.height;

		$("#container").css('height',interactiveObj.containerheight);
		
		imageObj.onload =function()
		{
			context.drawImage(imageObj, interactiveObj.x,interactiveObj.y );  // image loaded
			interactiveObj.angle=0;
			
			
			
			interactiveObj.q=interactiveObj.equalparts[interactiveObj.z];   // interactiveObj.q would contain the value of equalparts array.
			interactiveObj.w=imageObj.width/2;
			interactiveObj.h=imageObj.height/2;
			var radians;
			for(interactiveObj.j=0;interactiveObj.j<interactiveObj.q;interactiveObj.j++)   //  loop will draw the stroke
			{
				interactiveObj.angle = interactiveObj.angle + 360 / interactiveObj.q;
				var radians = interactiveObj.angle / 180 * Math.PI;
				var endX =(interactiveObj.x+interactiveObj.w) +interactiveObj.w * Math.cos(radians);  //alert(endX); 
				var endY =(interactiveObj.y+interactiveObj.h ) - interactiveObj.w* Math.sin(radians);	    //alert(endY);
				context.moveTo(interactiveObj.x+interactiveObj.w,interactiveObj.y+interactiveObj.h);
				context.lineTo(endX,endY);
				context.lineWidth = 1;
				context.strokeStyle = 'white';
				context.stroke();
				
			}  //------------for closed
			alpha=0.5;
			interval2=setInterval("fade();",500);
		}//-------------- onload closes
	
		context.font = 'bold 15pt Calibri';
		context.textAlign = 'center';
		context.fillStyle = 'black';
		context.fillText(interactiveObj.names[interactiveObj.i], interactiveObj.namepos,170);
		interactiveObj.namepos+=150;
	
	}//-----------if closes
	else clearInterval(timer);

}//------------function closes

function fade()
{
	
	interactiveObj.a=interactiveObj.partsfaded[interactiveObj.fade];  // it saves the parts to be faded 
				
	interactiveObj.angle =360 / interactiveObj.q;
	var radians = interactiveObj.angle / 180 * Math.PI;
	
	var startAngle=0;
	var endAngle=radians*interactiveObj.a;
				
	context.beginPath();
												
	context.arc(interactiveObj.x+interactiveObj.w,interactiveObj.h,interactiveObj. h, startAngle, endAngle, false);
	context.lineTo(interactiveObj.x+interactiveObj.w,interactiveObj.h);
	
	context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
	context.fill()
	context.closePath();
	alpha-=0.1;
	
	interactiveObj.fade++;
	
	interactiveObj.w+=150;	
			
	interactiveObj.i++;     //loads the next image
	interactiveObj.x+=150;  // moves the x point of next image
	interactiveObj.z++;  // increases the index of equalparts array

	clearInterval(interval2);
	clearInterval(timer);	
	
	timer=setInterval("loadimage();",2000);
}

questionInteractive.prototype.animate=function()
{

	clearInterval(interval2);
	clearInterval(timer);
	canvas.width=canvas.width;
	interactiveObj= new questionInteractive();
	interactiveObj.init();
	
}

function resize()
{ 
	if(window.innerHeight < $("#container").height()) {
		scaleFactor = parseFloat(window.innerHeight/$("#container").height()); 
	} else if(window.innerWidth < $("#container").width()) {
		scaleFactor = parseFloat(window.innerWidth/$("#container").width());
	} else{
		scaleFactor = 1 ;									
	} 	
	$("#container").css({"-webkit-transform": "scale("+scaleFactor+")"});
	$("#container").css({"-moz-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-o-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"-ms-transform": "scale("+scaleFactor+")"});	
	$("#container").css({"transform": "scale("+scaleFactor+")"});		
}



