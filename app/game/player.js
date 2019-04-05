import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getValue } from '../helpers/get-value';

export default class Player {
    @tracked
    money = 1500

    @tracked
    positionOnBoard = 0

    @tracked
    properties = []; 

    constructor(name, token = '🐹') {
        this.name = name;
        this.token = token;
    }

    @action
    moveToNextPosition(diceTotal) {
        this.positionOnBoard += diceTotal;
    }

    // buyProperty(boardPosition) {
    //     this.money -= getValue([boardPosition, 'price']);
    //     this.properties.push()
    // }
}

