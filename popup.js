// https://developer.chrome.com/extensions/commands
// chrome.commands.onCommand.addListener(function(command) {});
// https://developer.chrome.com/extensions/omnibox
// chrome.omnibox.onInputStarted.addListener(function callback)
// chrome.omnibox.onInputChanged.addListener(function(e){console.log(e)})
chrome.omnibox.onInputEntered.addListener(jishoMe)

// http://jisho.org/forum/54fefc1f6e73340b1f160000-is-there-any-kind-of-search-api
// https://app.kanjialive.com/api/docs

const Jisho = 'http://jisho.org/api/v1/search/words?keyword='

var text = '';
chrome.extension.onMessage.addListener(function(myMessage, sender, sendResponse){
    console.log('Selection Message :::',myMessage)
    text=myMessage
    //do something that only the extension has privileges here
    return true;
 });

chrome.commands.onCommand.addListener(function(command){
  console.log('Trigger Command :::',command)
  if(text.length>0 && command === 'jisho-me'){
    console.log('TODO: jisho-me!')
    jishoMe(text);
  }

});


function jishoMe(text){
  fetch(Jisho+encodeURIComponent(text)).then(function(response) {
    response.json().then(function(o){o.data.forEach(c=>{if(true||c.is_common){
      console.log(  c.japanese.map(_c=>([_c.word,_c.reading].filter(f=>!!f).join(' – '))).join(', ') )
      console.log(  ` • ${c.senses.map(_c=>_c.parts_of_speech).join(', ')}${!c.is_common?' (uncommon)':''}` )
      console.log(  ` • Meaning: ${c.senses.map(_c=>(_c.english_definitions).map(_c=>('"'+_c+'"')).join(', '))}` )
      console.log(  '~~~~~~~~~~~~~~~' )
    }})})
  })
}
