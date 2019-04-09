import Component from "@glimmer/component";

export default class PlayerTokenComponent extends Component {
  // getter => arr of token types
  get visibleTokens() {
    if (!this.args.game) return [];

    const players = this.args.game.players;

    // list of players that's on this space
    let playersOnSpace = players.filter(
      p => `${p.positionOnBoard}` === `${this.args.position}`
    );

    // array of player tokens
    return playersOnSpace.map(p => p.token);
  }

  //
}
