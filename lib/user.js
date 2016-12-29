'use strict'

let user = {};

user.emblem = (obj, statsObj, name, consoleId) => {
  var bundle = statsObj; //passed in character obj
  let charArray = obj.Response.destinyAccounts[usernameCheck(obj, name, consoleId)].characters; //general account req obj
  statsObj['displayName'] = obj.Response.destinyAccounts[usernameCheck(obj, name, consoleId)].userInfo.displayName; //name
  statsObj['grimoireScore'] = obj.Response.destinyAccounts[usernameCheck(obj, name, consoleId)].grimoireScore; //grimoire

  charArray.forEach((char) => {
    var bundle = statsObj.characters
    var index = idChecker(char.characterId, bundle);

    bundle[index]['emblemPath'] = char.emblemPath;
    bundle[index]['backgroundPath'] = char.backgroundPath;
    bundle[index]['level'] = char.level;
    bundle[index]['className'] = char.characterClass.className;
    bundle[index]['powerLevel'] = char.powerLevel;
  })

  // console.log(bundle);
  return bundle;
}

function usernameCheck(obj, name, id) { //verifies passed name and checks bungie.net for ps4 or xb1 account
  var nameCheck = obj.Response.destinyAccounts[0].userInfo;
  if(nameCheck.displayName.toLowerCase() === name.toLowerCase() && nameCheck.membershipType == id){
    return 0
  } else {
    return 1
  }
}

function idChecker(id, bundle) { //verifies ID & returns index
  var index;
  for(var i = 0; i < bundle.length; i++){
    var y = bundle[i];
    if(y.characterId == id){
      index = i;
      return index
    }
  }
}

module.exports = user;
