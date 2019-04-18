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

    @tracked
    isInJail = false;

    // Only flip to "true" when player draws a "Get out of Jail" card
    @tracked
    numGetOutOfJailCard = 0;

    // Get out of jail double rolls
    @tracked
    GOOJrolls = 0;

    constructor(name, token = 'car') {
        this.name = name;
        this.token = token;
    }

    @action
    moveToNextPosition(diceTotal) {
       return this.positionOnBoard += diceTotal;
    }

    // IF player throws double 3x, go to jail: 
    goToJail() {
        this.positionOnBoard = 9.75;
        this.isInJail = true;
        this.doublesCount = 0;
    }

    // Player can buy property
    takeAction(){
        let currentPosition = this.positionOnBoard;

        // player lands on a property space
        if (allNames[currentPosition].streetName) {
            console.log("I'm on a property");
        } else if (allNames[currentPosition].name.includes('Railroad')) {
            console.log("I'm on a railroad");
        } else if (allNames[currentPosition].name.includes('Income Tax')) {
            console.log("Time to pay Income tax");
            this.pay(allNames[currentPosition].price);

        } else if (allNames[currentPosition].name.includes('Luxury Tax')) {
            console.log("Time to pay Luxury tax");
            this.pay(allNames[currentPosition].price);

        } else if (allNames[currentPosition].name.includes('Community')) {
            console.log("Pick a card from Comm chest deck");
        } else if (allNames[currentPosition].name.includes('Chance')) {
            console.log("Pick a card from Chance deck");
        } else if (allNames[currentPosition].name.includes('Jail')) {
            console.log("I'm rotting in jail");
        } else if (allNames[currentPosition].name.includes('Visiting')) {
            console.log("I'm just visiting");
        } else if (allNames[currentPosition].name.includes('Electric')) {
            console.log("I'm on Electric utility space");
        } else if (allNames[currentPosition].name.includes('Waterworks')) {
            console.log("I'm on WaterWorks utility space");
        } else if (allNames[currentPosition].name.includes('Parking')) {
            console.log("I'm on free parking");
        } else if (allNames[currentPosition].name.includes('Go To')) {
            console.log("Time to go to jail");
            this.goToJail;

        } else if (currentPosition === 0) {
            console.log("Time to collect salary $200");
        }
    }

    // Player should update titleDeeds after each purchase

    // buyProperty(boardPosition) {
    //     this.money -= getValue([boardPosition, 'price']);
    //     this.properties.push()
    // }

    // Player's positionOnBoard resets after passing 38 (arrives at Go, which is position 0)
        // also receives $200 at this time


    // player can collect money
    collect(amount) {
        return this.money += amount;
    }

    // player can pay money
    pay(amount) {
        return this.money -= amount;
    }

}

