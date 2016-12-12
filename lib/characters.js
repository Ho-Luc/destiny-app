'use strict'

var characters = {};

characters.individualStats = (obj) => {
  let charArray = obj.Response.characters;
  let bundle = {
    'cumulativeTimeOnAllCharacters': null,
    'characters': []
  };
  var sum = 0;
  var counter = 0;
  var mostPlayed = {
    time: 0,
    seconds: 0,
    index: counter,
    id: ''
  }

  charArray.forEach((char) => {
    if(char.deleted === false) {
      var a = char.results.allPvP.allTime;
      if(char.merged.allTime.secondsPlayed.basic.value > mostPlayed.seconds) {
        mostPlayed.time = char.merged.allTime.secondsPlayed.basic.displayValue;
        mostPlayed.seconds = char.merged.allTime.secondsPlayed.basic.value;
        mostPlayed.index = counter;
        mostPlayed.id = char.characterId;
      }
      bundle.characters.push({});
      bundle.characters[counter]['characterId'] = char.characterId;
      bundle.characters[counter][a.killsDeathsRatio.statId] = a.killsDeathsRatio.basic.displayValue; //kd
      bundle.characters[counter][a.weaponBestType.statId] = a.weaponBestType.basic.displayValue; //best weapon
      bundle.characters[counter][a.winLossRatio.statId] = a.winLossRatio.basic.displayValue + ' : 1'; //w/l ratio
      bundle.characters[counter][a.combatRating.statId] = a.combatRating.basic.displayValue; //combat rating
      bundle.characters[counter]['timePlayedCrucible'] = a.secondsPlayed.basic.displayValue; //cruc time played
      bundle.characters[counter]['totalTimePlayed'] = char.merged.allTime.secondsPlayed.basic.displayValue; //total play time
      sum += char.merged.allTime.secondsPlayed.basic.value;
      counter += 1;
    }
    bundle.cumulativeTimeOnAllCharacters = sum;
  })
  bundle.characters[mostPlayed.index].totalTimePlayed = mostPlayed.time + ' (Most Played Character!)'
  bundle.cumulativeTimeOnAllCharacters = (bundle.cumulativeTimeOnAllCharacters/86400).toFixed(2) + 'd' + ' (' + (bundle.cumulativeTimeOnAllCharacters/3600).toFixed(2) + ' hrs)';
  return bundle;
}

module.exports = characters;
