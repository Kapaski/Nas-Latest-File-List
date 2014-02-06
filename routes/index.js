
/*
 * GET home page.
 */

var fs = require("fs");
var url = require("url");

var path = "//192.168.1.14/Volume_1/大娘/";
var ls=[]
var els = []
var days = 8
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === deleteValue || this[i]=== undefined) {         
      this.splice(i, 1);
      i--;
    }
  }
   return this;
};
function explorer(path){
	
	var x =fs.readdirSync(path)
	  .map(function(v) {
	  var f = fs.statSync(path+"\\"+v)
	  if(!f.isDirectory()&&((new Date().getTime() - f.mtime.getTime()) > 1000*60*60*24*days) ){
			return false;
	  }
	  if(f.isDirectory()){
		 explorer(path+"\\"+v)
	  }else{
		  var ext = v.split('.').pop()
		  var exts = ["mp4","mkv","rmvb","avi"]
		  if(exts.indexOf(ext)>-1) {
		    var t = fs.statSync(path+"\\"+v).mtime
			var el = {
				name:v,
				time: "("+t.getHours()+":"+t.getMinutes()+" "+t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear()+")",
				mtime:t.getTime()
			} 
			els.push(el)
			//ls.push(v+" -- ("+t.getHours()+":"+t.getMinutes()+" "+t.getDate()+"/"+(t.getMonth()+1)+"/"+t.getFullYear()+")")
			  
		  }else{
			return false;
		  }
	 }
	})
	
}

exports.index = function(req, res){
  console.log(req.param('days'))
  days = req.param('days') || 8;
  ls = []
  els=[]
  explorer(path)
  els.sort(function(a,b) {
	return b.mtime-a.mtime
  })
  .map(function(v) {
		//console.log(v)
		var t = v.time
		return ls.push(v.name+" -- "+t)
			
	})
	res.render('index', 
	{ 
		title: '大娘Nas' ,
		list : els,
		days : days
	}
	);
  
};