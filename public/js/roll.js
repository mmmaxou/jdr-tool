/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {int} max - The highest possible number
 * @param {int} min - The lowest possible number
 * @returns {int} A random integer between min and max
 */
function randInt(max, min) {
  min = min || 1;
  return Math.floor(Math.random() * (max - min + 1)) + 1;
}

function rollDice() {
  if (arguments.length === 1) {
    return rollDiceString(arguments[0]);
  } else {
    return rollDiceParams(arguments[0], arguments[1]);
  }
}

function rollDiceString(str) {
  var parts = str.split('d');
  return rollDiceParams(parts[0] || 1, parts[1]);
}

function rollDiceParams(num, sides) {
  var result = {rolls: [], result: 0};
  var i = 0;
  for (; i < num; i++) {
    var roll = randInt(sides, 1);
    result.rolls.push(roll);
    result.result += roll;
  }
  return result;
}