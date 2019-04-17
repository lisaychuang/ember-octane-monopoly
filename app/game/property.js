import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';

export default class Property {

    @tracked
    isMortgaged = false;

    @tracked
    ownedBy = '';

    @tracked
    housesBuilt = 0;

    constructor(name, boardPosition) {
        this.name = name;
        this.position = boardPosition;
    }

    // Property can be purchased by a player 


    // Property can be swapped between players


    // Once purchased, property can generate rent


    // Property can have houses / hotels built on them
    

    // Property can be mortgaged by player



}