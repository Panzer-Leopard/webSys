import {actionToTeamRocket, meowthRobot} from "./Observer.js";

class NextTurnButton {
    constructor() { }
    requestNextTurn() { }
}



class DataUpdate {
    constructor() { }
    requestNextTurn() {
        console.log("2. 다음 턴을 진행하기 위해 DB에 접근하여 데이터를 update 후, read함");
    }
}


class DataUpdateProxy extends NextTurnButton {
    constructor(dataUpdate) {
        super();
        this.dataUpdate = dataUpdate;
    }
    requestNextTurn() {
        if (meowthRobot.avoidCount === 1) {
            console.log("1. 나옹로봇이 공격을 회피합니다");
            meowthRobot.avoidCount = 0;
        }
        else {
            this.beforeProc();
            this.dataUpdate.requestNextTurn();
        }
        this.afterProc();
    }
    beforeProc() {
        console.log("1. 로딩중, 최근 턴 결과를 출력");
        console.table(actionToTeamRocket.enemy);
    }
    afterProc() {
        console.log("3. 로딩 끝, 다음 턴 진행");
        console.log("\n");
    }
}





var dataUpdate = new DataUpdate();
var dataUpdateProxy = new DataUpdateProxy(dataUpdate);

export {dataUpdateProxy}