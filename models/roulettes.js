const Roulette = require("./roulette");
require('colors');

class Roulettes {
    _list = {};
    
    get listArr(){
        const list = [];
        Object.keys(this._list).forEach( key => {            
            list.push(this._list[key]);
        });

        return list;
    }

    constructor(){
        this._list = {};
    }

    borrarTarea( id = '' ){
        if (this._list[id]){
            delete this._list[id];
        }
    }

    loadRoulettesFromArray( roulette = [] ){
        roulette.forEach( roulette =>{
            this._list[roulette.id] = roulette;
        })
        
    }

    createRoulette( desc = '' ){
        const roulette = new Roulette(desc);
        this._list[roulette.id] = roulette;
        console.log(`id ruleta: ${roulette.id}`);
    }

    listBets(){        
        console.log();
        this.listArr.forEach((roulette, i) =>{            
            const idx = `${i+1}.`.green;
            const { desc, status } = roulette;
            let condition = '';            
            if(status === 'c') condition = 'Creada'.yellow;
            if(status === 'o') condition = 'Abierta'.green;
            if(status === 'cl') condition = 'Cerrada'.red;            

            console.log(`${ idx } ${ desc } :: ${ condition }`)
        })
    }

    listarPendientesCompletadas( completadas = true){

        console.log();
        let contador = 0;

        this.listArr.forEach((tarea) =>{
            
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            if(completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            }else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${  (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }
            
            
            
        })
    }

    toggleCompletadas( ids = [] ){

        ids.forEach( id => {

            const tarea = this._list[id];
            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toString();
            }
        });

        this.listArr.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                this._list[tarea.id].completadoEn = null;
            }
        });
    }

    openRoulette( id = '' ) {        
        if (this._list[id]){
            this._list[id].status = "o";
        }
    }

    closeRoulette( id = '' ){
        if (this._list[id]){
            this._list[id].status = "cl";
        }
    }
}

module.exports = Roulettes;