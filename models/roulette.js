const { v4: uuidv4 } = require('uuid');


class Roulette {
    id = '';
    desc = '';
    status = "c";

    constructor( desc ){
        this.id = uuidv4();
        this.desc = desc;
        this.status = "c";
    }

}

module.exports = Roulette;