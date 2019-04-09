import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class GameStateComponent extends Component {
    @service('currentGame') gameService;
    
    get currentGame() {
        console.warn('This is going away soon!');
        return this.gameService.game;
    }
}
