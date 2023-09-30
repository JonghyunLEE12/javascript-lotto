const MissionUtils = require("@woowacourse/mission-utils");
const MSG = require('./OutputMsg');
const CON = require('./Controller');
const NAME = require('./Names');

class StartGame {
    constructor() {
        this.purChaseLotto();
        this.lottoNumbers();
        this.winLottery();
        this.bonusLottery();
        this.staticCheck();
        this.staticShow();
        this.totalShow();
    }

    purChaseLotto() {
        MissionUtils.Console.print(`${MSG.Message.PURCHASE_LOTTO}`);
        MissionUtils.Console.readLine(MSG.Message.PURCHASE_LOTTO, (money) => {
            if (CON.moneyVal(money)) MissionUtils.Console.print(`${money}`);
            NAME.Names.purchase_money = money;
            NAME.Names.purchase_num = CON.calcAmount(money);
        });
    }

    lottoNumbers() {
        MissionUtils.Console.print(`${NAME.Names.purchase_num+MSG.Message.PURCHASE_AMOUNT}`);
        for (let i = 0; i < NAME.Names.purchase_num ; i ++) {
            const numbers = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
            const sorted_number = CON.purchaseNumberVal(numbers)
            NAME.Names.purchse_lotto_list.push(sorted_number);
            MissionUtils.Console.print(`[${sorted_number.join(', ')}]`);
        }
    }

    winLottery() {
        MissionUtils.Console.print(`${MSG.Message.WIN_NUMBER}`);
        MissionUtils.Console.readLine(MSG.Message.WIN_NUMBER, (number) => {
            if (CON.winNumberVal(number)) MissionUtils.Console.print(`${number}`);
            NAME.Names.lottery_win_number = number.split(',');
        });
    }
    bonusLottery() {
        MissionUtils.Console.print(`${MSG.Message.BONUS_NUMBER}`);
        MissionUtils.Console.readLine(MSG.Message.BONUS_NUMBER, (number) => {
            if (CON.moneyVal(number)) MissionUtils.Console.print(`${number}`);
            NAME.Names.bonus_number = number;
        });
    }
    staticCheck() {
        NAME.Names.staticObj = CON.staticCalc(
            NAME.Names.purchse_lotto_list,
            NAME.Names.lottery_win_number
        )
        NAME.Names.staticObj = CON.bonusCalc(
            NAME.Names.staticObj,
            NAME.Names.bonus_number
        )
    }
    staticShow() {
        MissionUtils.Console.print(`${MSG.Message.SHOW_STATIC}`);
        MissionUtils.Console.print(`${MSG.Message.THREE + NAME.Names.staticObj[3].length}개`);
        MissionUtils.Console.print(`${MSG.Message.FOUR + NAME.Names.staticObj[4].length}개`);
        MissionUtils.Console.print(`${MSG.Message.FIVE}${NAME.Names.staticObj['bonus'].length? NAME.Names.staticObj[5].length-1 : NAME.Names.staticObj[5].length}개`);
        MissionUtils.Console.print(`${MSG.Message.BONUS + NAME.Names.staticObj['bonus'].length}개`);
        MissionUtils.Console.print(`${MSG.Message.SIX + NAME.Names.staticObj[6].length}개`);
    }
    totalShow() {
        NAME.Names.finalObj = {
            '3' : NAME.Names.staticObj[3].length,
            '4' : NAME.Names.staticObj[4].length,
            '5' : NAME.Names.staticObj['bonus'].length? NAME.Names.staticObj[5].length-1 : NAME.Names.staticObj[5].length,
            '6' : NAME.Names.staticObj[6].length,
            'bonus' : NAME.Names.staticObj['bonus'].length,

        }       
        const total = CON.totalCalc(NAME.Names.finalObj,NAME.Names.purchase_money);
        MissionUtils.Console.print(`${MSG.Message.TOTAL} ${total}%입니다.`);
    }
}
module.exports = StartGame;

// 현재 보너스 값이 있을 경우 5 값과 bonus 의 값이 중복되는 경우가 발생
// 따라서 만약 bonus 값이 0이 아니라면 5길이를 하나 빼줘야함