const db = require('./db')
const helper = require('../helper')

//Función con la consulta para insertar datos en la base de datos: INSERT
async function insertData (req, res) {
    const data = req.query
    const result = await db.query(
        `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`,
        [data.nombre, data.marca, data.tipo, Number(data.precio)]
    )
    return result.affectedRows
}

//Función con la consulta de obtener datos de la base de datos: select * from coleccion
async function getData (req, res) {
    const rows = await db.query(`
        SELECT * FROM coleccion
    `)
    const data = helper.emptyOrRows(rows)
    return {
        data
    }
}

//Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteData (req, res) {
    const data = req.query
    const result = await db.query(
        `DELETE FROM coleccion WHERE id = ?`,
        [Number(data.id)]
    )
    return result.affectedRows
}

module.exports = {
    getData,
    insertData,
    deleteData
}