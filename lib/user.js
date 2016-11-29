'use strict'

let user = {};

user.emblem = (obj, statsObj) => {
  var bundle = statsObj; //passed in character obj
  let charArray = obj.Response.destinyAccounts[0].characters; //general account req obj
  statsObj['displayName'] = obj.Response.destinyAccounts[0].userInfo.displayName; //name
  statsObj['grimoireScore'] = obj.Response.destinyAccounts[0].grimoireScore; //grimoire

  charArray.forEach((char) => {
    var bundle = statsObj.characters
    var index = idChecker(char.characterId, bundle);

    bundle[index]['emblemPath'] = char.emblemPath;
    bundle[index]['backgroundPath'] = char.backgroundPath;
    bundle[index]['level'] = char.level;
    bundle[index]['className'] = char.characterClass.className;
    bundle[index]['powerLevel'] = char.powerLevel;
  })

  console.log(bundle);
  return bundle;
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
