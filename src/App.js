const LottoNumbers = require('./LottoNumbers');
const Lotto = require('./Lotto');


const MissionUtils = require("@woowacourse/mission-utils");
class App {
  play() {
    const lottoNumberInstance = new LottoNumbers();

    MissionUtils.Console.print('구입금액을 입력해 주세요.')
    MissionUtils.Console.readLine('구입금액 :', (money) => {
      MissionUtils.Console.print(`${money}`)
      lottoNumberInstance.purchaseNumberCheck(money);
    })

    
    MissionUtils.Console.print(`${lottoNumberInstance.lottoBuyCount}개를 구매했습니다.`);
    for (let i = 0; i < lottoNumberInstance.lottoBuyCount; i ++) {
      let lottoNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      const lottoInstance = new Lotto(lottoNumber);
      lottoInstance.duplicationCheck();
      lottoNumberInstance.numberList.push(lottoNumber);
      MissionUtils.Console.print(`[${lottoNumber.join(', ')}]`)
    }

    MissionUtils.Console.print('당첨 번호를 입력해 주세요.');

    MissionUtils.Console.readLine('당첨 번호 :', (numbers) => {
      const numberCheck = new Lotto(numbers.split(','));
      numberCheck.duplicationCheck();
      MissionUtils.Console.print(`${numbers}`);
      lottoNumberInstance.WINNUMBER = numbers.split(',');
    })
    MissionUtils.Console.print('보너스 번호를 입력해 주세요.');

    MissionUtils.Console.readLine('보너스 번호 :', (number) => {
      MissionUtils.Console.print(`${number}`);
      lottoNumberInstance.BOUNSNUMBER = number
    })

    MissionUtils.Console.print('당첨 통계');
    MissionUtils.Console.print('---');
    lottoNumberInstance.lottoStatic();
    const order = ['3','4','5','bonus','6'];
    for ( let obj of order) {
      switch (obj) {
        case '3': MissionUtils.Console.print(`${obj}개 일치 (5,000원) - ${lottoNumberInstance.staticObject[obj]}개`);
          break
        case '4': MissionUtils.Console.print(`${obj}개 일치 (50,000원) - ${lottoNumberInstance.staticObject[obj]}개`);
          break
        case '5': MissionUtils.Console.print(`${obj}개 일치 (1,500,000원) - ${lottoNumberInstance.staticObject[obj]}개`);
          break
        case 'bonus': MissionUtils.Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${lottoNumberInstance.staticObject[obj]}개`);
          break
        case '6': MissionUtils.Console.print(`${obj}개 일치 (2,000,000,000원) - ${lottoNumberInstance.staticObject[obj]}개`);
          break
      }
    }
    MissionUtils.Console.print(`총 수익률은 ${lottoNumberInstance.calculateLotto()}%입니다.`);
    

  }
}

module.exports = App;
