import { tracked } from '@glimmer/tracking';
import Player from './player';
import Dice from './dice';
import { action } from '@ember/object';

/**
 * Data that describes where the game is at
 */
export default class State {

    // Initiate new player instances
    @tracked
    players = [
        new Player('Mike'),
        new Player('Lisa')
    ]

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
    rollForCurrentPlayer (){
        this.dice.roll();
        const diceTot = this.dice.total;
        this.currentPlayer.moveToNextPosition(diceTot);

        if (!this.dice.isDouble) {
            this.isDiceRollAllowed = false;
        }
    }

    @action
    endTurn() {
        if (this.currentPlayerId === this.players.length -1) this.currentPlayerId = 0;
        else this.currentPlayerId++;

        this.isDiceRollAllowed = true;
    }


    // After diceRoll, player's token should move to new space
        // IF space is empty, ask to buy?
        // IF space is owned, pay rent
}