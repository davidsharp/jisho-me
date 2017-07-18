var selection=''
 document.onselectionchange=function(e){
   //console.log(window.getSelection(),window.getSelection().toString())
   if(window.getSelection().toString()!==selection)chrome.extension.sendMessage(window.getSelection().toString(), function(response) {
      //callback
   });
 }
