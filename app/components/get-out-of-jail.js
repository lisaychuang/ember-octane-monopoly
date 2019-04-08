import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class GetOutOfJailComponent extends Component {
    @action
    payFine(){
        const {player} = this.args;
        player.money -=50;
        player.isInJail = false;
        player.GOOJrolls = 0;
    }

    @action 
    useGOOJcard(){
        const {player} = this.args;
        player.numGetOutOfJailCard--;
        player.isInJail = false;
        player.GOOJrolls = 0;
    }
}
