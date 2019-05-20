import { tracked } from "@glimmer/tracking";
import Player from "./player";
import Dice from "./dice";
import Property from "./property";

import { action } from "@ember/object";
import { assert } from "@ember/debug";
import propertyData from '../utils/names';

// SET UP Property State
function buildPropertyStates() {
  // create an object to eventually return (it starts out empty)
  // iterate over all of the KEYS of whatever's exported from 'game/utils/name.js'
    // given a key from name.js, figure out if it is state-worthy (i.e., property, utility)
    // if it is -->  '3':  new PropertyState(stuff)
    // otherwise do nothing and just move on to the next one

  // return the object you've assembled iteratively

  let propertyPositions = Object.keys(propertyData);
  let data = {};

  propertyPositions.forEach(function(position){
    let propertyConfig = propertyData[position];

    if (propertyConfig.price && !propertyConfig.isTax){
      const name = propertyConfig.streetName || propertyConfig.name
      const prop = new Property(name, position);
      data[position] = prop;
    }
  })

  return data;
}

class GameUI {
  @tracked
  showPropertyManagerModal = false;
}

/**
 * Data that describes where the game is at
 */
export default class State {

  @tracked
  ui = new GameUI();

  @tracked
  propertyStates = buildPropertyStates();

  // Initiate new player instances
  @tracked
  players = [new Player("Mike", "car"), new Player("Lisa", "dog")];

  // Game need to show which player's turn it is
  @tracked
  currentPlayerId = 0;

  get numPlayers() {
    return this.players.length;
  }

  get currentPlayer() {
    return this.players[this.currentPlayerId];
  }

  // Initiate new dice instance
  @tracked
  dice = new Dice();

  // Determine if player can roll dice
  @tracked
  isDiceRollAllowed = true;

  // Game need to prompt player to throw dice
  // Player need to be able to throw dice

  @action
  rollForCurrentPlayer() {
    this.dice.roll();
    const diceTot = this.dice.total;
    this.currentPlayer.moveToNextPosition(diceTot);

    const pos = this.currentPlayer.positionOnBoard;
    console.log('Player is at position ', pos);
    console.log('Data: ', this.propertyStates[`${pos}`]);
    this.takeAction();

    // if roll is NOT a double, player can't roll again
    if (!this.dice.isDouble) {
      this.isDiceRollAllowed = false;
    }
    // if current player already rolled 2x doubles, and the third roll is still a double
    else if (this.dice.isDouble && this.currentPlayer.doublesCount >= 2) {
      this.isDiceRollAllowed = false;
      this.currentPlayer.goToJail();
    }
    // if roll is a double, increase doublesCount by 1
    else {
      this.currentPlayer.doublesCount++;
    }
  }

  // Player can take action depending on where they land
  takeAction(){
    let currentPosition = this.currentPlayer.positionOnBoard;
    let space = propertyData[currentPosition];

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
        this.currentPlayer.pay(space.price);

    } else if (space.name.includes('Luxury Tax')) {
        this.currentPlayer.pay(space.price);

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
        this.currentPlayer.goToJail();
    } 
    
    // player lands on GO, collect salary
    else if (currentPosition === 0) {
        console.log("Time to collect salary $200");
        this.currentPlayer.collect(200);
    }
}

  // IF in jail, player can get out of jail by:

  getOutOfJail() {
    assert(
      "getOutOfJail should only be called while current player is in jail",
      this.currentPlayer.isInJail
    );
    if (this.currentPlayer.GOOJrolls < 3) {
      // Have less than 3 tries at double rolls, player may attempt a roll for doubles
      this.dice.roll(); // normally would call rollForCurrentPlayer, but that includes moving position on board

      // Roll Double to get out
      if (this.dice.isDouble) {
        // freedom!
        this.leaveJail();
      } else {
        // still in jail, good luck next turn
        this.currentPlayer.GOOJrolls++;
        this.isDiceRollAllowed = false;
      }
    } else {
      // Already had 3 tries at double rolls, must pay fine $50 and get out
      this.currentPlayer.money -= 50;
      this.isDiceRollAllowed = true;
      this.leaveJail();
    }
  }

  leaveJail() {
    this.currentPlayer.isInJail = false;
    this.currentPlayer.GOOJrolls = 0;
    this.currentPlayer.positionOnBoard = 10;

    // TODO: do we want the player to be involved in "rolling" to move? This is automatic
    this.rollForCurrentPlayer();
  }

  @action
  endTurn() {
    if (this.currentPlayerId === this.players.length - 1)
      this.currentPlayerId = 0;
    else this.currentPlayerId++;

    this.isDiceRollAllowed = true;
  }

  // After diceRoll, player's token should move to new space
  // IF space is empty, ask to buy?
  // IF space is owned, pay rent
}
