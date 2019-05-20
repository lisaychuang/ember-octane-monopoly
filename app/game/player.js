import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import allNames from '../utils/names'
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

    // Only flip to "true" when player draws a "Get out of Jail" card
    @tracked
    isInJail = false;

    @tracked
    numGetOutOfJailCard = 0;

    // Get out of jail double rolls
    @tracked
    GOOJrolls = 0;

    constructor(name, token = 'car') {
        this.name = name;
        this.token = token;
    }

    // Update player's positionOnBoard after a dice roll
    @action
    moveToNextPosition(diceTotal) {
       let nextPosition = this.positionOnBoard + diceTotal;

    // if nextPosition > 39, player's positionOnBoard resets (arrives at Go, which is position 0)
    // player passes Go and need to collect $200 salary     
       if (nextPosition > 39) {
           this.money += 200;
           this.positionOnBoard = nextPosition - 38;
       } else {
           this.positionOnBoard = nextPosition;
       }
    }

    // IF player throws double 3x, go to jail: 
    goToJail() {
        this.positionOnBoard = 9.75;
        this.isInJail = true;
        this.doublesCount = 0;
    }


    // Player can buy property (if empty)

    buyProperty(position) {
        let price = allNames[position].price;
        this.money -= price;
        this.titleDeeds.push(position);
    }

    // player can collect money
    collect(amount) {
        return this.money += amount;
    }

    // player can pay money
    pay(amount) {
        return this.money -= amount;
    }

}

