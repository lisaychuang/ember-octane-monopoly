import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
// import { getValue } from '../helpers/get-value';

export default class Player {
    @tracked
    money = 1500

    @tracked
    positionOnBoard = 0

    @tracked
    titleDeeds = []; 

    @tracked
    doublesCount = 0;

    @tracked
    isInJail = false;

    constructor(name, token = '🐹') {
        this.name = name;
        this.token = token;
    }

    @action
    moveToNextPosition(diceTotal) {
        this.positionOnBoard += diceTotal;
    }

    // IF player throws double 3x, go to jail: 
    tripleDoubleRolls() {
        this.positionOnBoard = 10;
        this.isInJail = true;
        this.doublesCount = 0;
    }


    // Player should update titleDeeds after each purchase

    // buyProperty(boardPosition) {
    //     this.money -= getValue([boardPosition, 'price']);
    //     this.properties.push()
    // }

    // Player's positionOnBoard resets after passing 38 (arrives at Go, which is position 0)
        // also receives $200 at this time
}

