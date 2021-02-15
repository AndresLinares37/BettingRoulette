const { v4: uuidv4 } = require('uuid');

class Bet {
    id = '';
    idRoulette = '';
    user = '';
    amount = null;
    number = null;
    status = "n";

    constructor( idRoulette, user, amount, number ){
        this.id = uuidv4();
        this.idRoulette = idRoulette;
        this.user = user,
        this.amount = amount;
        this.number = number;
        this.status = "n"; //non-play
    }
}

module.exports = Bet;