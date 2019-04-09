import Component from "@glimmer/component";
import { inject as service } from "@ember/service";

export default class PlayerTokenComponent extends Component {
  // inject current game state into this component
  @service currentGame;

  // getter => arr of token types
  get visibleTokens() {
    const players = this.currentGame.game.players;

    // list of players that's on this space
    let playersOnSpace = players.filter(
      p => `${p.positionOnBoard}` === `${this.args.position}`
    );

    // array of player tokens
    return playersOnSpace.map(p => p.token);
  }

}
