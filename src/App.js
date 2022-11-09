// 로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
// 로또 1장의 가격은 1,000원이다.
// 당첨 번호와 보너스 번호를 입력받는다.
// 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력하고 로또 게임을 종료한다.
// 사용자가 잘못된 값을 입력할 경우 throw문을 사용해 예외를 발생시키고, "[ERROR]"로 시작하는 에러 메시지를 출력 후 종료한다.


const Lotto = require('./Lotto')
const Check = require('./Check')
const MissionUtils = require("@woowacourse/mission-utils");

class App {

  // 로또 번호 생성
  createLottoNumber(){
    let lottoNum = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6)
    return lottoNum
  }

  // 로또 번호 출력
  LottoNumbers(times){
    for (let i = 0; i < times; i ++){
      console.log(this.createLottoNumber())
    }

  }

  // 로또 구입
  buyLotto(money) {
    let LOTTO_AMOUNT = 0
    const checking = new Check()
    LOTTO_AMOUNT = checking.buyLotto(money)
    MissionUtils.Console.print(`${LOTTO_AMOUNT}개를 구매했습니다.`)
    this.LottoNumbers(LOTTO_AMOUNT)
  }

  // 로또 구입 금액
  money() {
    let MONEY = 0
    MissionUtils.Console.readLine('', (number) => {
      const checking = new Check()
      checking.checkNumbers(number)
      console.log(`${number}`)
      MONEY = number
    })
    this.buyLotto(MONEY)
  }

  // Play
  play() {
    // Start
    MissionUtils.Console.print("구입금액을 입력해 주세요.")
    this.money()
  }
}

module.exports = App;