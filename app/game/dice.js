import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Dice {
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