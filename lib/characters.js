'use strict'

var characters = {};

characters.individualStats = (obj) => {
  let charArray = obj.Response.characters;
  let bundle = {};
  console.log(obj.Response.characters.length)
  charArray.forEach((char) => {
    var counter = 1;
    if(char.deleted === false) {
      var a = char.results.allPvP.allTime.killsDeathsRatio;
      bundle[char.characterId] = {};
      bundle[char.characterId][a.statId] = a.basic.displayValue;
      counter++;
    }
  })
  console.log(bundle);
  return bundle;
}

module.exports = characters;
