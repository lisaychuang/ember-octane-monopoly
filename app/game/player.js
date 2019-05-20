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

    // Player can take action depending on where they land
    takeAction(){
        let currentPosition = this.positionOnBoard;
        let space = allNames[currentPosition];

        // player lands on a property| railroad | utilities space (STATE)
        if (space.streetName) {
            console.log("I'm on a property");
        } else if (space.name.includes('Railroad')) {
            console.log("I'm on a railroad");
        } else if (space.name.includes('Electric')) {
            console.log("I'm on Electric utility space");
        } else if (space.name.includes('Waterworks')) {
            console.log("I'm on WaterWorks utility space");
        }
        
        // ✅ player lands on a TAX space
        else if (space.name.includes('Income Tax')) {
            console.log("Time to pay Income tax");
            this.pay(space.price);

        } else if (space.name.includes('Luxury Tax')) {
            console.log("Time to pay Luxury tax");
            this.pay(space.price);

        } 
        
        // player lands on Community Chest | Chance space (STATE)
        else if (space.name.includes('Community')) {
            console.log("Pick a card from Comm chest deck");
        } else if (space.name.includes('Chance')) {
            console.log("Pick a card from Chance deck");
        } 
        
        // player lands on spaces with NO actions
        else if (space.name.includes('Jail')) {
            console.log("I'm rotting in jail");
        } else if (space.name.includes('Visiting')) {
            console.log("I'm just visiting. Do nothing");
        }  else if (space.name.includes('Parking')) {
            console.log("I'm on free parking. Do nothing");
        } 

        // player lands on GO TO JAIL space
        else if (space.name.includes('Go To')) {
            console.log("Time to go to jail");
            this.goToJail();
        } 
        
        // player lands on GO, collect salary
        else if (currentPosition === 0) {
            console.log("Time to collect salary $200");
            this.collect(200);
        }
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

