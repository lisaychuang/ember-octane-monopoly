import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GameboardComponent extends Component {

    @action
    onDiceRoll(){
        const { game } = this.args;
        if (game.currentPlayer.isInJail) {
            game.getOutOfJail();
        } else {
            game.rollForCurrentPlayer();
        }
    }
}
