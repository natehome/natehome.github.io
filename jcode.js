// get the button and make it respond to a click
var theButton = document.getElementById("b");
theButton.onclick = feedTheButton;
var theMCButton = document.getElementById("megacodeButton");
theMCButton.onclick = genButtonMC;

function intToHex( inputNumber ) { 
	var hexString = parseInt(inputNumber, 10).toString(16);
  return hexString.toString();
}
function hexToInt( inputHex ) { 
	var hexString = parseInt(inputHex, 16);
  return hexString.toString();
}
function intToBin( inputNumber ) { 
	var binString = parseInt(inputNumber, 10).toString(2);
  return binString.toString();
}
function binToInt( inputBin ) { 
	var binString = parseInt(inputBin, 2);
  return binString.toString();
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
function genUrlMegaCode( keyName, facData, codeData, btnData ) { 
  keyName = keyName.toString().replace(/\s/g, '');
  facbin = pad(intToBin(facData.toString().replace(/\s/g, '')),4);
  codebin = pad(intToBin(codeData.toString().replace(/\s/g, '')),16);
  btnbin = pad(intToBin(btnData.toString().replace(/\s/g, '')),3);
  binData = '1'+facbin+codebin+btnbin;
  hexData = intToHex(binToInt(binData))
  var kd1 = hexData.slice(0, 2).toUpperCase();
  var kd2 = hexData.slice(2, 4).toUpperCase();
  var kd3 = hexData.slice(4, 6).toUpperCase();
	var returnUrl = '<a href="https://dev.flpr.app/s/#path=subghz/'+keyName+'.sub&Filetype=Flipper+SubGhz+Key+File&Version=1&Frequency=318000000&Preset=FuriHalSubGhzPresetOok650Async&Protocol=MegaCode&Bit=24&Key='+kd1+'+'+kd2+'+'+kd3+'" target="_blank">'+keyName+'.sub</a>';
  return returnUrl;
}

function genButtonMC() {
	var namebox = (document.getElementById("nameboxmc").value);
	var cint = parseInt(document.getElementById("cboxmc").value);
  var fint = parseInt(document.getElementById("fboxmc").value);
  var bint = parseInt(document.getElementById("bboxmc").value);
  if(cint > 65535 || cint < 0){
    document.getElementById("write").innerHTML = 'Invalid Code';
    return;
  }
  if(fint > 15 || fint < 0){
    document.getElementById("write").innerHTML = 'Invalid FAC';
    return;
  }
  if(bint > 7 || bint < 0){
    document.getElementById("write").innerHTML = 'Invalid Btn';
    return;
  }

  //var bhex = intToHex(bint);
  var result = genUrlMegaCode(namebox, fint, cint, bint);
  var place = document.getElementById("writeMC");
  place.innerHTML = result;
  
}
