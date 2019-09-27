var shortUrl = require('node-url-shortener');
 
function shorter(){
    shortUrl.short('https://google.com', function(err, url){
    return url;
});
}

var res=shorter()
console.log(res);