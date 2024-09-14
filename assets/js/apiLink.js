//this function will take the window.location.search string of ?name=val and
//create an object like {'name':'val'}
var parseUrl = function(urlParams) {
  var retObj = {};
  var urlParameters = null;

  if (!urlParams || urlParams.length == 0) {return retObj}
  if (urlParams.charAt(0) == '?') {
      urlParameters = urlParams.substring(1);
  }else {
      urlParameters = urlParams;
  }
  if (urlParameters.length == 0) {return retObj}
  var parameterPairs = urlParameters.split('&');
  var x;
  for (x in parameterPairs) {
      var parameterPair = parameterPairs[x];
      parameterPair = parameterPair.split('=');
      retObj[parameterPair[0]] = parameterPair[1];
  }
  return retObj;
};
var createJson = function(){
    var params = parseUrl(window.location.search);
    //do work here
    var retObj = {}; //suppose this is the result of the work
    document.print(JSON.stringify(retObj)); //use the included JSON encoder
};