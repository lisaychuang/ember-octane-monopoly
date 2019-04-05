import { tracked } from '@glimmer/tracking';
// import { action } from '@ember/object';

export default class Bank {

    houseSupply = 50;
    hotelSupply = 20;

    @tracked
    titleDeeds = [1, 3, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 21, 23, 24, 25, 26, 27, 28, 29, 31, 32, 34, 35, 37, 39]

}