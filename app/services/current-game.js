import Service from '@ember/service';
import State from '../game/state';

export default class CurrentGameService extends Service {
    game = new State();
}