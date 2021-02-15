const fs = require('fs');

const file = './db/data.json';
const fileB = './db/bets.json';

const saveDB = ( data ) => {    
    fs.writeFileSync(file, JSON.stringify(data));
}

const saveBetDB = ( datab ) => {    
    fs.writeFileSync(fileB, JSON.stringify(datab));
}

const readDB = () =>{
    if( !fs.existsSync(file)){
        return null;
    }

    const info = fs.readFileSync(file, { encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;
}

const readBetsDB = () =>{
    if( !fs.existsSync(fileB)){
        return null;
    }

    const infoB = fs.readFileSync(fileB, { encoding: 'utf-8'});
    const dataB = JSON.parse(infoB);

    return dataB;
}

module.exports = {
    saveDB,
    saveBetDB,
    readDB,
    readBetsDB
}