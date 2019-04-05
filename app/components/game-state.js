import Component from '@glimmer/component';
import State from '../game/state';

export default class GameStateComponent extends Component {
    currentGame = new State();
   
}
