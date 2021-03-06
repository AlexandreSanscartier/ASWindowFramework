/*
Taken from: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
User: https://stackoverflow.com/users/508537/briguy37
*/
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function extractNumberFromStyle(style) {
  if(style.substr(style.length - 2, 2) === 'px') {
    var numberFromStyle = style.substring(0, style.length - 2);
    if(Number(numberFromStyle)) {
      return numberFromStyle;
    }
    console.error(style);
  }
  return style;
}

function getBrowserDimensions() {
  return {width: window.innerWidth, height: window.innerHeight}
}
