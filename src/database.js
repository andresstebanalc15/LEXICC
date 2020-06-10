const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err,connection) =>{
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('La conexion con la base de datos ha sido cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La conexión tiene muchas conexiones');
        }
        if (err.code === 'ECCONREFUSED') {
            console.error('La conexión ha sido rechazada');
        }
    }
    if (connection) connection.release();
    console.log('La base de datos ha sido conectada');
    return;
    
});
pool.query = promisify(pool.query);
module.exports = pool;