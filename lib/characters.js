'use strict'

var characters = {};

characters.individualStats = (obj) => {
  let charArray = obj.Response.characters;
  let bundle = {
    'cumulativeTimeOnAllCharacters': null
  };
  charArray.forEach((char) => {
    var sum = 0;
    if(char.deleted === false) {
      var a = char.results.allPvP.allTime;
      bundle[char.characterId] = {};
      bundle[char.characterId][a.killsDeathsRatio.statId] = a.killsDeathsRatio.basic.displayValue; //kd
      bundle[char.characterId][a.weaponBestType.statId] = a.weaponBestType.basic.displayValue; //best weapon
      bundle[char.characterId][a.winLossRatio.statId] = a.winLossRatio.basic.displayValue + ':1 (w/l)'; //w/l ratio
      bundle[char.characterId][a.combatRating.statId] = a.combatRating.basic.displayValue; //combat rating
      bundle[char.characterId]['timePlayedCrucible'] = a.secondsPlayed.basic.displayValue; //cruc time played
      bundle[char.characterId]['totalTimePlayed'] = char.merged.allTime.secondsPlayed.basic.displayValue; //total play time
      sum += char.merged.allTime.secondsPlayed.basic.value;
    }
    bundle.cumulativeTimeOnAllCharacters += sum;
  })
  bundle.cumulativeTimeOnAllCharacters = (bundle.cumulativeTimeOnAllCharacters/86400).toFixed(2) + 'd';
  return bundle;
}

module.exports = characters;
