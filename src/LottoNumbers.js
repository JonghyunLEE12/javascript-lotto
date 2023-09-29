
const MissionUtils = require("@woowacourse/mission-utils");


class LottoNumbers {
    constructor () {
        this.number = 0,
        this.lottoBuyCount = 0,
        this.WINNUMBER = [],
        this.BOUNSNUMBER = 0,
        this.numberList = [];
        this.staticObject = {
            '3' : 0,
            '4' : 0,
            '5' : 0,
            'bonus' : 0,
            '6' : 0,
        };

    }

    purchaseNumberCheck(money) {
        this.number = money;
        if (isNaN(this.number)) {
            throw new Error("[ERROR] 올바른 구매 금액을 입력해주세요.")
        }

        if (this.number % 1000 > 0) {
            throw new Error("[ERROR] 구입 금액은 1000원 단위로 입력해주세요.")
        }
        this.lottoBuyCount = this.number / 1000;
    }

    lottoNumberAdd(number) {
        this.numberList.push(number)
    }


    lottoStatic() {
        for ( let number of this.numberList) {
            this.lottoStaticCheck(number)
        }
    }

    lottoStaticCheck(numbers) {
        let count = 0
        for ( let num of numbers) {
            if (this.WINNUMBER.includes(String(num))) {
                count += 1;
            }
        }
        if (count >= 3) {
            this.staticObject[String(count)] += 1
        }
        if (count == 5) {
            this.bonusCheck(number)
        }


    }

    bonusCheck(numbers) {
        if (numbers.includes(this.BOUNSNUMBER)) {
            this.staticObject['bonus'] += 1
            this.staticOBject['5'] -= 1
        }
    }

    calculateLotto() {
        let proceeds = 0;
        for (let obj in this.staticObject) {
            if (this.staticObject[obj] == 0) continue;
            switch (obj) {
                case '3': proceeds += 5000; break
                case '4': proceeds += 50000; break
                case '5': proceeds += 1500000; break
                case 'bonus': proceeds += 30000000; break
                case '6': proceeds += 2000000000; break
              }
        }
        const finalProceeds = (((parseInt(this.number) + parseInt(proceeds)) - this.number) / this.number) * 100
        return finalProceeds
    }


}


module.exports = LottoNumbers;