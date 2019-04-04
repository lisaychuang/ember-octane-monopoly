import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from '@ember/object';

export default class DiceComponent extends Component {
    @tracked
    dice = '0,0';

    @action
    rollDice(){
        let first = Math.round(Math.random() * 6);
        let sec = Math.round(Math.random() * 6);
        this.dice = `${first}, ${sec}`
    }

    // getter to calc the sum of dice roll
    get sumDice() {
        let num = this.dice.split(',');
        return parseInt(num[0]) + parseInt(num[1]);
    }

    // getter to determine if dice roll is a Double
    get isDouble() {
        let num = this.dice.split(',');
        return (parseInt(num[0]) === parseInt(num[1]));
    }
}
