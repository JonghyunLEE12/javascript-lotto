const startGame = require('./startGame');
const MissionUtils = require("@woowacourse/mission-utils");

class App {
  play() {
    const gamestart = new startGame();
  }
}

module.exports = App;
