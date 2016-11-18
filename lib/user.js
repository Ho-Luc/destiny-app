'use strict'

let user = {};

user.emblem = (obj, statsObj) => {
  var bundle = statsObj;
  let charArray = obj.Response.destinyAccounts[0].characters;

  charArray.forEach((char) => {
    if(bundle.hasOwnProperty(char.characterId) === true){
      bundle[char.characterId]['emblemPath'] = char.emblemPath;
      bundle[char.characterId]['backgroundPath'] = char.backgroundPath;
      bundle[char.characterId]['level'] = char.level;
      bundle[char.characterId]['powerLevel'] = char.powerLevel;
    }
  })
  bundle['displayName'] = obj.Response.destinyAccounts[0].userInfo.displayName; //name
  bundle['grimoireScore'] = obj.Response.destinyAccounts[0].grimoireScore; //grimoire
  console.log(bundle);
  return bundle;
}

module.exports = user;
