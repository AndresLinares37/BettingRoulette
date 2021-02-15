require('colors');
const inquirer = require('inquirer');
const { saveDB, readDB, readBetsDB, saveBetDB } = require('./helpers/saveFile');
const { inquirerMenu, readInput, confirm, listRoulettesToOpen, listOpenedRoulettes } = require('./helpers/inquirer');
const { pause } = require('./helpers/pause');
const Roulette = require('./models/roulette');
const Roulettes = require('./models/roulettes');
const Bet = require('./models/bet');
const Bets = require('./models/bets');

console.clear();

const main = async() => {
    let opt = '';
    const roulettes = new Roulettes();
    const roulettesDB = readDB();
    if(roulettesDB) roulettes.loadRoulettesFromArray(roulettesDB);
    const bets = new Bets();
    const betsDB = readBetsDB();
    if(betsDB) bets.loadBetsFromArray(betsDB);
    do{
        // Print menu
        opt = await inquirerMenu();
        switch(opt){
            case '1':
                const desc = await readInput('Descripción: ');
                roulettes.createRoulette(desc);
            break;
            case '2':
                const id = await listRoulettesToOpen( roulettes.listArr );
                if (id !== '0'){
                    const ok = await confirm('¿Está seguro?');
                    if (ok) {
                        roulettes.openRoulette(id);
                        console.log('Ruleta abierta');
                    }                
                }
            break;
            case '3':
                const idb = await listOpenedRoulettes( roulettes.listArr );                
                if (idb !== '0'){
                    const okb = await confirm('¿Realizar apuesta?');
                    const user = await readInput('Usuario: ');
                    const amount = await readInput('Monto: ');
                    const number = await readInput('Número a apostar: ');
                    if (okb) {                        
                        console.log(`Apuesta realizada: ${idb}\n Usuario: ${user}, monto: ${amount}, número: ${number}`);
                        bets.createBet(idb, user, amount, number);
                    }                
                }
            break;
            case '4': 
                const idToClose = await listOpenedRoulettes( roulettes.listArr );
                if (idToClose !== '0'){
                    const okb = await confirm('¿Cerrar apuestas?');
                    if (idToClose) {
                        console.log('Apuesta cerrada');
                        bets.closeBet(idToClose);
                        roulettes.closeRoulette(idToClose);
                    }                
                }
            break;
            case '5':
                roulettes.listBets();
            break;
        }

        saveDB( roulettes.listArr );
        saveBetDB( bets.listBArrb );                
        if (opt !== '0') await pause();
    } while( opt !== '0')    
}

main();