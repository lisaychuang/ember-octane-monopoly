import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';

export default class Player {
    @tracked
    money = 1500
    positionOnBoard = 0
    properties = []; 
    constructor(name, token = '🐹') {
        this.name = name;
        this.token = token;
    }

    nextPosition(dice) {
        return this.positionOnBoard + dice[0] + dice[1];
    }

    doubleMoney() {
        this.money *= 2;
    }
}

