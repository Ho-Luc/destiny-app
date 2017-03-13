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
    var a = char.results.allPvP.allTime;
    if(char.deleted === false) {

      if(char.merged.allTime.secondsPlayed.basic.value > mostPlayed.seconds) {
        mostPlayed.time = char.merged.allTime.secondsPlayed.basic.displayValue;
        mostPlayed.seconds = char.merged.allTime.secondsPlayed.basic.value;
        mostPlayed.index = counter;
        mostPlayed.id = char.characterId;
      }

      if(char.results.allPvP.hasOwnProperty('allTime') === false){
        var noCruc = noCrucibleCheck(char);
        var b = noCruc.results.allPvP.allTime;

        bundle.characters.push({});
        bundle.characters[counter]['characterId'] = char.characterId;
        bundle.characters[counter][b.killsDeathsRatio.statId] = b.killsDeathsRatio.basic.displayValue; //kd
        bundle.characters[counter][b.weaponBestType.statId] = b.weaponBestType.basic.displayValue; //best weapon
        bundle.characters[counter][b.winLossRatio.statId] = b.winLossRatio.basic.displayValue; //w/l ratio
        bundle.characters[counter][b.combatRating.statId] = b.combatRating.basic.displayValue; //combat rating
        bundle.characters[counter]['timePlayedCrucible'] = b.secondsPlayed.basic.displayValue; //cruc time played
        bundle.characters[counter]['timePlayedCrucibleInt'] = b.secondsPlayed.basic.value; //cruc time played
        bundle.characters[counter]['totalTimePlayed'] = char.merged.allTime.secondsPlayed.basic.displayValue; //total play time
        bundle.characters[counter]['totalTimePlayedInt'] = char.merged.allTime.secondsPlayed.basic.value
        sum += char.merged.allTime.secondsPlayed.basic.value;
        counter += 1;
        return;
      }

      bundle.characters.push({});
      bundle.characters[counter]['characterId'] = char.characterId;
      bundle.characters[counter][a.killsDeathsRatio.statId] = a.killsDeathsRatio.basic.displayValue; //kd
      bundle.characters[counter][a.weaponBestType.statId] = a.weaponBestType.basic.displayValue; //best weapon
      bundle.characters[counter][a.winLossRatio.statId] = a.winLossRatio.basic.displayValue + ' : 1'; //w/l ratio
      bundle.characters[counter][a.combatRating.statId] = a.combatRating.basic.displayValue; //combat rating
      bundle.characters[counter]['timePlayedCrucible'] = a.secondsPlayed.basic.displayValue; //cruc time played
      bundle.characters[counter]['timePlayedCrucibleInt'] = a.secondsPlayed.basic.value; //cruc time played
      bundle.characters[counter]['totalTimePlayed'] = char.merged.allTime.secondsPlayed.basic.displayValue; //total play time
      bundle.characters[counter]['totalTimePlayedInt'] = char.merged.allTime.secondsPlayed.basic.value
      sum += char.merged.allTime.secondsPlayed.basic.value;
      counter += 1;
    }

    bundle.cumulativeTimeOnAllCharacters = sum;
  })
  bundle.characters[mostPlayed.index].totalTimePlayed = mostPlayed.time + ' (Most Played Character!)'
  bundle.cumulativeTimeOnAllCharacters = (bundle.cumulativeTimeOnAllCharacters/86400).toFixed(2) + 'd' + ' (' + (bundle.cumulativeTimeOnAllCharacters/3600).toFixed(2) + ' hrs)';
  return bundle;
}

function noCrucibleCheck(char) {
  var obj = char;
  obj.results.allPvP['allTime'] = {
    'killsDeathsRatio': {'statId': 'killsDeathsRatio',
                          'basic': {
                            'displayValue': 'N/A'
                          }
                        },
    'weaponBestType': {'statId': 'weaponBestType',
                        'basic': {
                          'displayValue': 'N/A'
                        }
                      },
    'winLossRatio': {'statId': 'winLossRatio',
                      'basic': {
                        'displayValue': 'N/A'
                      }
                    },
    'combatRating': {'statId': 'combatRating',
                      'basic': {
                        'displayValue': 'N/A'
                      }
                    },
    'secondsPlayed' : {'basic' : {
                          'displayValue': 0
                        }
                    }
  };
  return obj
}

module.exports = characters;
