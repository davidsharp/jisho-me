// https://developer.chrome.com/extensions/commands
// chrome.commands.onCommand.addListener(function(command) {});
// https://developer.chrome.com/extensions/omnibox
// chrome.omnibox.onInputStarted.addListener(function callback)
chrome.omnibox.onInputChanged.addListener(function(e){console.log(e)})
// chrome.omnibox.onInputEntered.addListener(function callback)

// http://jisho.org/forum/54fefc1f6e73340b1f160000-is-there-any-kind-of-search-api
// https://app.kanjialive.com/api/docs

var text = '';
chrome.extension.onMessage.addListener(function(myMessage, sender, sendResponse){
    console.log('Selection Message :::',myMessage)
    text=myMessage
    //do something that only the extension has privileges here
    return true;
 });

chrome.commands.onCommand.addListener(function(command){
  console.log('Trigger Command :::',command)
  if(text.length>0 && command === 'jisho-me')
    console.log('TODO: jisho-me!')
});
