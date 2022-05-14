// get the button and make it respond to a click
var theButton = document.getElementById("b");
theButton.onclick = feedTheButton;

// simple function compares two numbers, returns the larger one
function greatestOfTwo( first, second ) { 
	if ( first > second ) {
		return first; 
   } else {
		return second; 
  }
}
function intToHex( inputNumber ) { 
	var hexString = inputNumber.toString(16);
  return hexString.toString();
}
function hexToInt( inputHex ) { 
	var hexString = parseInt(inputHex, 16);
  return hexString.toString();
}
function cardInfo( cardInfo, facInfo ) { 
	var place = document.getElementById("codeInfo");
  place.innerHTML = 'Card:'+cardInfo+
    ' FAC:'+facInfo;
}
function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}
function genUrlRFID( keyName, keyType, keyData ) { 
  keyName = keyName.toString().replace(/\s/g, '');
  keyType = keyType.toString().replace(/\s/g, '');
  keyData = keyData.toString().replace(/\s/g, '');
  var kd1 = keyData.slice(0, 2);
  var kd2 = keyData.slice(2, 4);
  var kd3 = keyData.slice(4, 6);
	var returnUrl = '<a href="https://dev.flpr.app/s#path=lfrfid/'+keyName+'.rfid&Filetype=Flipper+RFID+key&Version=1&Key+type='+keyType+'&Data='+kd1+'+'+kd2+'+'+kd3+'" target="_blank">'+keyName+'.rfid</a>';
  return returnUrl;
}

function feedTheButton() {
	var namebox = (document.getElementById("namebox").value);
	var cint = parseInt(document.getElementById("cbox").value);
  var fint = parseInt(document.getElementById("fbox").value);
  if(cint > 65535 || cint < 0){
    document.getElementById("write").innerHTML = 'Invalid card ID';
    return;
  }
  if(fint > 255 || fint < 0){
    document.getElementById("write").innerHTML = 'Invalid FAC';
    return;
  }
  //var bint = parseInt(document.getElementById("bbox").value);
  var chex = pad(intToHex(cint),4);
  var fhex = pad(intToHex(fint),2);
  var fchex = (fhex+chex).toUpperCase();
  //var bhex = intToHex(bint);
  var result = genUrlRFID(namebox, 'H10301', fchex);
  var place = document.getElementById("write");
  place.innerHTML = result;
  cardInfo(cint+'='+chex,fint+'='+fhex);
}
