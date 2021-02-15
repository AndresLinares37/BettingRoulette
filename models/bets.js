const Bet = require("./bet");
require('colors');

class Bets {
    _listb = {};
    
    get listBArrb(){
        const listb = [];
        Object.keys(this._listb).forEach( key => {            
            listb.push(this._listb[key]);
        });

        return listb;
    }

    constructor(){
        this._listb = {};
    }

    loadBetsFromArray( bet = [] ){
        bet.forEach( bet =>{
            this._listb[bet.id] = bet;
        })
        
    }

    createBet(idRoulette, user, amount, number){
        if(parseInt(amount) < 1 || parseInt(amount) > 10000){
            console.log('Debe ingresar un valor entre 1 y 10.000');
            return null;
        }
        if(parseInt(number) < 0 || parseInt(number) > 36){
            console.log('Debe ingresar un número entre 0 y 36');
            return null;
        }
        const bet = new Bet(idRoulette, user, amount, number);
        this._listb[bet.id] = bet;
    }

    closeBet(id){
        const betRandom = Math.floor(Math.random() * 36);
        const col = (betRandom%2 === 0) ? betRandom.toString().green : betRandom.toString().red; 
        console.log(`Resultado apuesta: ${col}`);
        console.log();
        this.listBArrb.forEach((bet, i) =>{    
            const { idRoulette, user, amount, number } = bet; 
            const num = (number%2 === 0) ? number.toString().green : number.toString().red;
            const colorBet = (betRandom%2 === parseInt(number%2)) ? parseInt(amount)*1.8 : 0;
            const numberBet = ( betRandom === parseInt(number)) ? parseInt(amount)*5 : 0;            
            if(idRoulette === id) console.log(`Usuario: ${ user }, Monto: ${ amount } Número: ${num} :: Ganancias por numero: $${numberBet}, por color: $${colorBet} `);
        })
    }

}

module.exports = Bets;