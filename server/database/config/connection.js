require('dotenv').config()
const { Pool } = require('pg')

let dbUrl = '';

if(process.env.NODE_ENV == 'development'){
    dbUrl = process.env.DEV_DB_URL
}else{
    dbUrl = process.env.DB_URL
}

if(!dbUrl) throw new Error('no Database Url !!!')

console.log(dbUrl,'---------',process.env.NODE_ENV);

const connection = new Pool({
    connectionString : dbUrl,
    ssl: process.env.NODE_ENV == 'development' ? false : true
})

module.exports = connection;

