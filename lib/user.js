'use strict'

let user = {};

user.emblem = (obj, statsObj) => {
  var bundle = statsObj;
  let charArray = obj.Response.destinyAccounts[0].characters;
  var counter = 0;

  charArray.forEach((char) => {
    bundle.characters[counter]['emblemPath'] = char.emblemPath;
    bundle.characters[counter]['backgroundPath'] = char.backgroundPath;
    bundle.characters[counter]['level'] = char.level;
    bundle.characters[counter]['className'] = char.characterClass.className;
    bundle.characters[counter]['powerLevel'] = char.powerLevel;
    counter ++;
  })

  bundle['displayName'] = obj.Response.destinyAccounts[0].userInfo.displayName; //name
  bundle['grimoireScore'] = obj.Response.destinyAccounts[0].grimoireScore; //grimoire
  //console.log(bundle);
  return bundle;
}

module.exports = user;
