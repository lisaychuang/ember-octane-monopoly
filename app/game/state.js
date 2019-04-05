import { tracked } from '@glimmer/tracking';
import Player from './player';
import Dice from './dice';
// import { action } from '@ember/object';

/**
 * Data that describes where the game is at
 */
export default class State {
    @tracked
    players = [
        new Player('Mike'),
        new Player('Lisa')
    ]
    
    @tracked
    dice = new Dice();
    
    get numPlayers() {
        return this.players.length;
    }

}