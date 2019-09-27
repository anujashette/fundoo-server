var date =new Date()
var time = date.getHours() +':'+ date.getMinutes();
var day = date.getDay() +'/'+ date.getMonth()+'/'+date.getFullYear();

module.exports = {time , day}