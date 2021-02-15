require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.green}. Crear ruleta`
            },
            {
                value: '2',
                name: `${'2'.green}. Apertura ruleta`
            },
            {
                value: '3',
                name: `${'3'.green}. Apostar a ruleta`
            },
            {
                value: '4',
                name: `${'4'.green}. Cerrar apuestas`
            },
            {
                value: '5',
                name: `${'5'.green}. Listar ruletas`
            },
            {
                value: '0',
                name: `${'0'.green}. Salir`
            }
            
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('======================================'.green);
    console.log('        Seleccione una opción         '.white);
    console.log('======================================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const readInput = async( message ) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);

    return desc;
}

const  confirm = async(message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const listRoulettesToOpen = async( roulettes = []) => { 
    const choices = roulettes.map((roulette, i) => {
        const idx = `${i+1}`.green;
        if(roulettes[i]['status'] === 'o') roulettes.splice(i,1); 
        return {
            value: roulettes[i]['id'],
            name: `${idx} ${roulettes[i]['desc']}`
        }         
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Abrir',
            choices
        }
    ]
    const { id } = await inquirer.prompt(question);

    return id;
}

const listOpenedRoulettes = async( roulettes = []) => { 
    let choices = [];
    for(let i=0;i<roulettes.length;i++){
        const idx = `${i+1}`.green;
        if(roulettes[i]['status'] === 'o') {
            choices.push({
                value: roulettes[i]['id'],
                name: `${idx} ${roulettes[i]['desc']}`
            });
        }
    }
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });
    const question = [
        {
            type: 'list',
            name: 'id',
            message: '¿A cúal ruleta desea apostar?',
            choices
        }
    ]
    const { id } = await inquirer.prompt(question);

    return id;
}

module.exports = {
    inquirerMenu,
    readInput,
    confirm,
    listRoulettesToOpen,
    listOpenedRoulettes
}