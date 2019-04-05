import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

class Player {
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

class Dice {
    @tracked
    current = [0, 0];

    lastRolls = []
    get isDouble() {
        return this.current[0] === this.current[1];
    }
 
    get total() {
        return this.current[0] + this.current[1];
    }

    @action
    roll(){
        let first = Math.round(Math.random() * 6);
        let sec = Math.round(Math.random() * 6);
        this.current = [first, sec];
    }
}

/**
 * Data that describes where the game is at
 */
class State {
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


export default class GameStateComponent extends Component {
    currentGame = new State();
   
}
