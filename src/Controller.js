const MissionUtils = require("@woowacourse/mission-utils");


const moneyVal = (money) => {
    if (isNaN(money)) throw new Error("[ERROR] 구입 금액은 숫자로 입력해주세요.")
    return true;
}

const calcAmount = (money) => {
    if (money % 1000 !== 0) throw new Error("[ERROR] 구입 금액은 1000원 단위 입니다.")
    return money / 1000;
}

const purchaseNumberVal = (lotto) => {
    sorted_lotto = [...lotto].sort((a,b) => a - b);
    lotto = new Set(lotto);
    if (lotto.size !== 6) throw new Error("[ERROR] 로또 숫자가 중복되었습니다.")
    return sorted_lotto
}

const winNumberVal = (number) => {
    const winNumber = number.split(',');
    if (winNumber.length !== 6) throw new Error("[ERROR] 당첨 숫자는 6개 여야 합니다.")
    const setWinNumber = new Set([...winNumber]);
    if (setWinNumber.size !== 6) throw new Error("[ERROR] 로또 숫자가 중복되었습니다.")
    return true
}

const staticCalc = (numberList,winNum) => {
    let staticObj = {
        3 : [],
        4 : [],
        5 : [],
        bonus : [],
        6 : []
    }
    numberList.map(number => {
        const count = checkingWin(number,winNum);
        if (count >= 3) staticObj[count].push(number);
    });
    return staticObj
}

const checkingWin = (number,winNum) => {
    let count = 0
    number.map(num =>{
        if (winNum.includes(String(num))) count += 1;
    })
    return count
}

const bonusCalc = (staticObj,bonusNum) => {
    staticObj[5].map(checkList =>{
        if (checkingBonus(checkList,bonusNum)) staticObj[bonus].push(checkList)

    })
    return staticObj
}

const checkingBonus = (checkList,bonusNum) => {
    if (checkList.includes(parseInt(bonusNum))) return true
}

const totalCalc = (finalObj,money) => {
    let total = 0;
    for (let obj in finalObj) {
        if (finalObj[obj] == 0) continue;
        if (obj == '3') total += 5000;
        if (obj == '4') total += 50000;
        if (obj == '5') total += 1500000;
        if (obj == '6') total += 2000000000;
        if (obj == 'bonus') total += 30000000;
    }
    const answer = (((total + parseInt(money)) - parseInt(money) ) / parseInt(money)) * 100
    return answer
}

module.exports = { 
    moneyVal,
    calcAmount,
    purchaseNumberVal,
    winNumberVal,
    staticCalc,
    bonusCalc,
    totalCalc,
}