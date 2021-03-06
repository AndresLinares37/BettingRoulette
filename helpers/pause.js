const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'input',
        name: 'opcion',
        message: `Presione ${'ENTER'.green} para continuar\n`        
    }
];

const pause = async() => {

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

module.exports = {
    pause
}